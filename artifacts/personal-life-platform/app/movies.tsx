import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { getPopularMovies, searchMovies, MovieResult } from '@/services/liveApi';
import { useLife } from '@/context/LifeContext';
import { AppButton, AuraGlow, Card, Field, Screen, SectionTitle, styles } from '@/components/ui';

function MovieCard({movie,onFavorite,favorite}:{movie:MovieResult;onFavorite:()=>void;favorite:boolean}) {
 const colors=useColors();
 return <Pressable onPress={()=>router.push({pathname:'/movie/[id]',params:{id:String(movie.id)}})} style={{width:150}}>
   <View style={{height:225,borderRadius:18,overflow:'hidden',backgroundColor:colors.card,borderWidth:1,borderColor:'rgba(224,231,255,.08)'}}>
    {movie.poster?<Image source={{uri:movie.poster}} style={{width:'100%',height:'100%'}}/>:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Feather name="film" size={30} color={colors.mutedForeground}/></View>}
    <View style={{position:'absolute',left:8,right:8,bottom:8,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <View style={{backgroundColor:'rgba(11,14,21,.82)',paddingHorizontal:8,paddingVertical:5,borderRadius:9}}><Text style={{color:colors.foreground,fontSize:11,fontWeight:'700'}}>★ {movie.rating.toFixed(1)}</Text></View>
      <Pressable onPress={e=>{e.stopPropagation?.();onFavorite()}} style={{width:32,height:32,borderRadius:16,backgroundColor:'rgba(11,14,21,.82)',alignItems:'center',justifyContent:'center'}}><Feather name="heart" size={15} color={favorite?colors.destructive:colors.foreground}/></Pressable>
    </View>
   </View>
   <Text numberOfLines={2} style={{color:colors.foreground,fontSize:14,fontWeight:'700',marginTop:9}}>{movie.title}</Text>
   <Text style={{color:colors.mutedForeground,fontSize:11,marginTop:3}}>{movie.releaseDate?.slice(0,4)||'—'}</Text>
 </Pressable>;
}

export default function MoviesScreen(){
 const colors=useColors(); const {mediaFavorites,isMediaFavorite,toggleMediaFavorite}=useLife();
 const [query,setQuery]=useState(''); const [results,setResults]=useState<MovieResult[]>([]); const [popular,setPopular]=useState<MovieResult[]>([]);
 const [loading,setLoading]=useState(false); const [error,setError]=useState('');
 useEffect(()=>{getPopularMovies().then(setPopular).catch(e=>setError(e?.message||'Не удалось загрузить каталог'));},[]);
 const doSearch=async()=>{if(!query.trim())return;setLoading(true);setError('');try{setResults(await searchMovies(query));}catch(e:any){setError(e?.message||'Проверьте TMDB token');}finally{setLoading(false)}};
 const favorite=(m:MovieResult)=>toggleMediaFavorite({id:String(m.id),kind:'movie',title:m.title,subtitle:m.releaseDate?.slice(0,4)||'Фильм',image:m.poster,url:m.tmdbUrl,externalId:String(m.id)});
 return <Screen><AuraGlow/>
   <View style={{paddingTop:8}}><Text style={[styles.eyebrow,{color:colors.cyan}]}>AURA • CINEMA</Text><Text style={[styles.sectionTitle,{color:colors.foreground,fontSize:32}]}>Фильмы</Text><Text style={{color:colors.mutedForeground,marginTop:6}}>Постеры, названия и просмотр прямо внутри приложения.</Text></View>
   <View style={{flexDirection:'row',gap:8,marginTop:18}}><Field value={query} onChangeText={setQuery} placeholder="Найти фильм…" style={{flex:1}}/><Pressable onPress={doSearch} style={{width:50,height:48,borderRadius:14,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'}}><Feather name="search" size={20} color={colors.primaryForeground}/></Pressable></View>
   {loading&&<ActivityIndicator style={{marginTop:18}} color={colors.primary}/>}
   {error?<Card><Text style={{color:colors.destructive,fontWeight:'700'}}>Каталог недоступен</Text><Text style={{color:colors.mutedForeground,marginTop:5}}>{error}</Text></Card>:null}
   {results.length>0?<><SectionTitle eyebrow="SEARCH" title="Результаты"/><View style={{flexDirection:'row',flexWrap:'wrap',gap:16}}>{results.map(m=><MovieCard key={m.id} movie={m} favorite={isMediaFavorite('movie',String(m.id))} onFavorite={()=>favorite(m)}/>)}</View></>:<><SectionTitle eyebrow="DISCOVER" title="Популярное"/><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:14}}>{popular.slice(0,8).map(m=><MovieCard key={m.id} movie={m} favorite={isMediaFavorite('movie',String(m.id))} onFavorite={()=>favorite(m)}/>)}</ScrollView></>}
   <SectionTitle eyebrow="LIBRARY" title="Избранное"/>
   {mediaFavorites.filter(x=>x.kind==='movie').length===0?<Card><Text style={{color:colors.mutedForeground}}>Добавляйте фильмы в избранное, чтобы собрать свою библиотеку.</Text></Card>:<View style={{gap:10}}>{mediaFavorites.filter(x=>x.kind==='movie').map(x=><Pressable key={x.id} onPress={()=>router.push({pathname:'/movie/[id]',params:{id:x.id}})} style={{flexDirection:'row',alignItems:'center',gap:12}}><Card style={{flex:1,flexDirection:'row',alignItems:'center',marginBottom:0,padding:10}}>{x.image?<Image source={{uri:x.image}} style={{width:52,height:76,borderRadius:10}}/>:null}<View style={{flex:1}}><Text style={{color:colors.foreground,fontWeight:'700'}}>{x.title}</Text><Text style={{color:colors.mutedForeground,fontSize:12,marginTop:4}}>{x.subtitle}</Text></View><Feather name="chevron-right" size={18} color={colors.mutedForeground}/></Card></Pressable>)}</View>}
 </Screen>;
}
