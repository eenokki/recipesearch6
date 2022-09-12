import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => { 
     fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`) 
      .then(response => response.json())  
      .then(data => setRecipes(data.meals))  
      .catch(error => {         
        Alert.alert('Error:', error.message);  
       });
      }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRecipes} />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}
            </Text>

            <Image
              style={styles.image}
              source={{ uri: item.strMealThumb }}
            />
          </View>}
        data={recipes}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80
  },
  input: {
    fontSize: 18,
    marginTop: 100,
    padding: 10
  }
});
