import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      carouselData: [],
      headerTitle: null
    }
  }

  async componentDidMount() {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "mobileNumber": "9980668008",
        "customerId": "Dumont0000012345",
        "sessionId": "pPmJCJX59By5UnVO-KY92jNVEvc7zs0lm"
        
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    return await fetch('http://68.183.89.98:1111/api/getHomescreenContent', data)
    .then((response) => response.json())
    .then((responseJSON) => {
      let data = responseJSON.response.map((item) => {
        return {
          headerTitle: item.headerText,
          image: item.itemUrl,
          name: item.name,
          description: item.highlightText
        }
      })
      this.setState({
        carouselData: data,
        headerTitle: data[0].headerTitle
      })
    })
    .catch((error)=>error)
  }

  _renderItem({item, index}) {
    return(
      <View style={{flex:1, width: Dimensions.get('window').width * 0.7, alignItems:"center", justifyContent:"center"}}>
        <Image
        style={{width:200, height:200,borderRadius: 20,shadowColor: '#333'}}
        source={{uri:item.image}}/>
         <Text style={{color:'#001E41', marginTop:20,fontSize: 26, textAlign: 'center', marginEnd: 20}} >{item.name}</Text>
         
        <Text style={{textAlign:"justify", marginTop:6, padding:10,  marginEnd: 20}}>{item.description}</Text>
       
      </View>

    )
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
       <ImageBackground style={{flex:1}}>
          <View style={{flex:0.2, alignItems:"center", justifyContent:"center"}}>
            <Text style={{color: 'black', fontSize: 26}}>{this.state.headerTitle}</Text>
          </View>

          <View style={{flex:0.8, alignItems:"center", justifyContent:"center"}}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.carouselData}
                renderItem={this._renderItem}
                sliderWidth={1000}
                itemWidth={Dimensions.get('window').width * 0.7}
              />
          </View>
          </ImageBackground>
       
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
