import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, type PressableProps, type TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const colors = useColors();
  const { useSafeAreaInsets } = require('react-native-safe-area-context') as typeof import('react-native-safe-area-context');
  const insets = useSafeAreaInsets();
  const Container = scroll ? require('react-native').ScrollView : View;
  return <Container style={[styles.screen,{backgroundColor:colors.background}]} contentContainerStyle={scroll ? {paddingTop:insets.top+16,paddingBottom:insets.bottom+110}:undefined} showsVerticalScrollIndicator={false}>{children}</Container>;
}

export function AuraGlow() {
  const colors = useColors();
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={[styles.glow,{backgroundColor:colors.violet,top:70,left:-90,opacity:.13}]} />
    <View style={[styles.glow,{backgroundColor:colors.cyan,top:330,right:-110,opacity:.09}]} />
    <View style={[styles.glow,{backgroundColor:colors.emerald,bottom:120,left:30,opacity:.06}]} />
  </View>;
}

export function AppButton({ children, icon, variant='primary', onPress, ...props }: PressableProps & {children:React.ReactNode;icon?:keyof typeof Feather.glyphMap;variant?:'primary'|'secondary'|'ghost'}) {
  const colors=useColors();
  return <Pressable {...props} onPress={e=>{Haptics.selectionAsync().catch(()=>undefined);onPress?.(e)}} style={({pressed})=>[styles.button,{backgroundColor:variant==='primary'?colors.primary:variant==='secondary'?colors.card:'transparent',borderColor:colors.border,opacity:pressed?.72:1},variant==='ghost'&&styles.ghostButton]}>
    {icon?<Feather name={icon} size={16} color={variant==='primary'?colors.primaryForeground:colors.foreground}/>:null}
    <Text style={[styles.buttonText,{color:variant==='primary'?colors.primaryForeground:colors.foreground}]}>{children}</Text>
  </Pressable>;
}

export function Card({children,style}:{children:React.ReactNode;style?:object}) {
  const colors=useColors();
  return <View style={[styles.card,{backgroundColor:'rgba(25,27,35,0.82)',borderColor:'rgba(224,231,255,0.09)'},style]}>{children}</View>;
}
export function SectionTitle({eyebrow,title,action}:{eyebrow?:string;title:string;action?:React.ReactNode}) {
  const colors=useColors();
  return <View style={styles.sectionHeader}><View>{eyebrow?<Text style={[styles.eyebrow,{color:colors.cyan}]}>{eyebrow}</Text>:null}<Text style={[styles.sectionTitle,{color:colors.foreground}]}>{title}</Text></View>{action}</View>;
}
export function Field({label,...props}:TextInputProps&{label?:string}) {
 const colors=useColors();
 return <View style={styles.fieldWrap}>{label?<Text style={[styles.fieldLabel,{color:colors.mutedForeground}]}>{label}</Text>:null}<TextInput {...props} placeholderTextColor={colors.mutedForeground} style={[styles.field,{color:colors.foreground,backgroundColor:colors.card,borderColor:colors.border},props.style]}/></View>;
}
export function IconBadge({icon,color}:{icon:keyof typeof Feather.glyphMap;color?:string}) {
 const colors=useColors(); return <View style={[styles.iconBadge,{backgroundColor:color??colors.accent}]}><Feather name={icon} size={18} color={colors.accentForeground}/></View>;
}
export function LoadingState(){const colors=useColors();return <View style={styles.loading}><ActivityIndicator color={colors.primary}/><Text style={{color:colors.mutedForeground}}>Загружаем Aura…</Text></View>}

export const styles=StyleSheet.create({
 screen:{flex:1,paddingHorizontal:20},
 glow:{position:'absolute',width:300,height:300,borderRadius:150},
 card:{borderRadius:20,borderWidth:1,padding:16,marginBottom:12,overflow:'hidden'},
 sectionHeader:{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',marginTop:22,marginBottom:12},
 eyebrow:{fontSize:10,fontWeight:'700',letterSpacing:1.6,textTransform:'uppercase',marginBottom:5},
 sectionTitle:{fontSize:22,fontWeight:'700',letterSpacing:-.4},
 button:{minHeight:46,borderRadius:14,paddingHorizontal:16,flexDirection:'row',gap:8,alignItems:'center',justifyContent:'center',borderWidth:1},
 ghostButton:{paddingHorizontal:8,borderWidth:0},
 buttonText:{fontSize:14,fontWeight:'700'},
 fieldWrap:{gap:6,marginBottom:10,flex:1},
 fieldLabel:{fontSize:12,fontWeight:'600'},
 field:{minHeight:48,borderRadius:14,borderWidth:1,paddingHorizontal:14,fontSize:15},
 iconBadge:{width:42,height:42,borderRadius:15,alignItems:'center',justifyContent:'center'},
 loading:{alignItems:'center',justifyContent:'center',padding:32,gap:12},
});
