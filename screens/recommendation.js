import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native'
import {Card} from 'react-native-elements'
import {RFValue} from 'react-native-responsive-fontsize'
import axios from 'axios'

export default class RecommendedArticlesScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.getData()
    }
    languageType(details){
        lang = details[8]
        if(lang==PT){
            details[8].append('non-english')
        }
        return 
    }
    getData=()=>{
        const url = 'http://localhost:5000/recommended-articles'
        axios.get(url)
        .then(async response=>{
            this.setState({
                data:response.data.data
            })
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    keyExtractor=(item, index)=>{
        index.toString()
    }
    renderItem=({item, index})=>{
        return (
            <Card key={`card-${index}`} featuredTitle={item.title}
                containerStyle={styles.cardcontainer} featuredTitleStyle={styles.title}
                featuredSubtitle={`${item.release_date.split('-')[0]} | ${this.languageType(item.lang)}`}
                featuredSubtitleStyle={styles.subtitle}
            >
            </Card>
        )
    }
    render(){
        const {data} = this.state
        return(
            <View style={styles.container}>
                <FlatList data={data} keyExtractor={this.keyExtractor} renderItem={this.renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'white'},
    title:{color:'white', alignSelf:'flex-start', paddingLeft:RFValue(15), fontSize:RFValue(25), marginTop:RFValue(65)},
    subtitle:{fontWeight:'bold', alignSelf:'flex-start', paddingLeft:RFValue(15), fontSize:RFValue(15)},
    cardcontainer:{flex:1, justifyContent:'center', borderRadius:RFValue(10), height:RFValue(110), marginBottom:RFValue(20)}
})