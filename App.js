import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, TextInput, Button, Alert } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


var c = 14;

// class which displays text with diffrent sizes from 14 to 34 in 1/2 second period
class MyChangingText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fsize: 14,
      color: 'red'
    };

    setInterval(() => {
      this.setState(previousState => {
        return {
          fsize: MyChangingText._calculateNewFontSize(previousState.fsize),
          color: previousState.color == 'red' ? 'blue' : 'red'
        }
      });
    }, 500);

  }

  static _calculateNewFontSize(prev) {
    if (prev > 32) {
      return 14;
    } else {
      return prev + 2;
    }
  }

  render() {
    return (
      <Text style={{ fontSize: this.state.fsize, color: this.state.color }}>{this.props.text}  {this.state.fsize}</Text>
    );
  }
}

//class which testing inputs
class MyInputTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: ''
    };
  }

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <TextInput style={{ height: 40, borderWidth: 1, width: 250, }} onChangeText={(text) => this.setState({ text1: text })} />
        <Text style={{ padding: 10, fontSize: 42, borderWidth: 1 }}>
          {this.state.text1.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }

}

//class which testing button
class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      flex: 0
    };
  }

  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  render() {
    return (
      <Button onPress={this._onPressButton} title={this.state.title} backgroundColor= 'green'/>
    );
  }
}

class HomeScreen extends Component {
  render() {

    return (
      <View style={styles.mainWrap}>
        <View style={styles.headerBelt}></View>

        <View style={styles.container}>
          <MyChangingText text='have a little fun from react-native' />
          <MyInputTest />
          <MyButton title='Press me'/>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'powderblue' }} />
            <View style={{ flex: 2, backgroundColor: 'skyblue' }} />
            <MyButton title='CLick to go to second page' />
          </View>
        </View>
      </View>
    );
  }
}

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

// export default TabNavigator({
//   Home: { screen: HomeScreen },
//   Settings: { screen: SettingsScreen },
// });


export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'darkgreen',
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarBackgroundColor: 'yellow',
  }
);

const styles = StyleSheet.create({
  mainWrap: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  headerBelt: {
    height: 25,
    backgroundColor: 'green',
  },
});
