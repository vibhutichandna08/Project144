import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Header, AirbnbRating, Icon} from 'react-native-elements'
import {RFValue} from 'react-native-responsive-fontsize'
import axios from 'axios'

export default class HomeScreen extends Component{
    constructor(){
        super()
        this.state={
            articledetails:{}
        }
    }
    componentDidMount(){
        this.getArticle()
    }
    languageType(details){
        lang = details[8]
        if(lang==PT){
            details[8].append('non-english')
        }
        return 
    }
    getArticle=()=>{
        const url = 'http://localhost:5000/get-article'
        axios.get(url)
        .then(response=>{
            let details = response.data.data
            this.setState({
                articledetails:details
            })
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    likeArticle=()=>{
        const url = 'http://localhost:5000/liked-movie'
        axios.post(url)
        .then(response=>{
            this.getArticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    dislikeArticle=()=>{
        const url = 'http://localhost:5000/disliked-movie'
        axios.post(url)
        .then(response=>{
            this.getArticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    notReadArticle=()=>{
        const url = 'http://localhost:5000/not-watched-movie'
        axios.post(url)
        .then(response=>{
            this.getArticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    render(){
        const {articledetails} = this.state
        if(articledetails.poster_link){
            const {title, release_date, language, overview, rating} = articledetails
        }
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header centerComponent={{text:'Article Recommended', style:styles.headerTitle}} rightComponent={{icon:'search', color:'white'}}
                        backgroundColor = {'#D500F9'} containerStyle={{flex:1}}
                    />
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.subTopContainer}>
                        <Image style={styles.posterImage} source={{uri:'https://icons.iconarchive.com/icons/iconsmind/outline/512/Newspaper-2-icon.png'}}/>
                    </View>
                    <View style={styles.subBottomContainer}>
                        <View style={styles.upperBottomContainer}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                            <Text style={styles.subTitle}>
                                {`${release_date.split('-')[0]}`}
                            </Text>
                        </View>
                        <View style={styles.middleBottomContainer}>
                            <View style={{flex:0.3}}>
                                <AirbnbRating count={10} reviews={['','','','','']} defaultRating={rating} isDisabled={true} size={RFValue(25)}
                                    starContainerStyle = {{marginTop:-30}}
                                />
                            </View>
                            <View style={{flex:0.7, padding:15}}>
                                <Text style={styles.overview}>
                                    {overview}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.lowerBottomContainer}>
                            <View style={styles.iconButtonContainer}>
                                <TouchableOpacity onPress={this.likeArticle} style={styles.button}>
                                    <Text>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.dislikeArticle} style={styles.button}>
                                    <Text>Dislike</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.notReadArticle} style={styles.button}>
                                    <Text>Not read</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1},
    headerContainer:{flex:0.1},
    subContainer:{flex:0.9},
    subBottomContainer:{flex:0.6},
    middleBottomContainer:{flex:0.35},
    upperBottomContainer:{flex:0.2, alignItems:'center'},
    subTopContainer:{flex:0.4, justifyContent:'center', alignItems:'center'},
    lowerBottomContainer:{flex:0.45},
    buttonContainer:{justifyContent:'center',alignItems:'center'},
    headerTitle:{color:'white', fontWeight:'bold', fontSize:RFValue(18)},
    posterImage:{width:'60%', height:'90%', resizeMode:'stretch', borderRadius:RFValue(30), marginHorizontal:RFValue(10)},
    title:{textAlign:'center', fontWeight:'bold', fontSize:RFValue(20)},
    subTitle:{fontWeight:'300', fontSize:RFValue(14)},
    overview:{color:'grey', fontWeight:'300', fontSize:RFValue(13), textAlign:'center'},
    buttonText:{fontWeight:'bold', fontSize:RFValue(15)},
    iconButtonContainer:{alignItems:'center', justifyContent:'space-evenly', flexDirection:'row'},
    button:{alignItems:'center', justifyContent:'center', width:RFValue(160), height:RFValue(50), borderRadius:RFValue(20), borderWidth:1, marginTop:RFValue(15)}
})