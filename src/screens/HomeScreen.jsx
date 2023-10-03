






import { StatusBar, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import axios from 'axios'
import Recipe from '../components/Recipe'

const HomeScreen = () => {


  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])


  const [recipeList, updateRecipeList] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [textRecipe, setTextRecipe] = useState()


  useEffect(() => {
    getCategory();
    getRecipe();
  }, [])

  // !Search recipe 
  const fetchRecipeSearch = async (searchString) => {
    const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchString}
    `)
    console.log("This meals >>>>>>>>>>> ",response.data.meals);
    setMeals(response.data.meals)
    // updateRecipeList(response.data.hits)
    // console.log(response.data.hits);

  }

  const onTextChange = (text) => {
    setMeals([])
    clearTimeout(timeoutId);
    const timeOut = setTimeout(() => fetchRecipeSearch(text), 1000);
    updateTimeoutId(timeOut);

  }

  const getCategory = async () => {

    try {

      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      // console.log("getting data:", response.data);


      if (response && response.data) {

        let reverseArray = response.data.categories
        setCategories(reverseArray.reverse());
      }

    } catch (error) {
      console.log("This an error>>>",error);
    }
  }

  const getRecipe = async (category = "Vegetarian") => {

    try {

      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}
      `)
      // console.log("getting data:", response.data);
      if (response && response.data) {
        setMeals(response.data.meals)
      }

    } catch (error) {

    }
  }


  const handleChangeCategory = (category) => {

    getRecipe(category);
    setActiveCategory(category);
    setMeals([]);

  }


  return (
    <View className="flex-1 bg-white" >
      <StatusBar styles="dark" />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-4 ">


        {/* avatar and icon */}
        <View className="mx-4 flex-row justify-between items-center ">
          <Image source={require("../../assets/images/avatar.png")} style={{ width: hp(5.5), height: hp(5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Buddy!</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">Make your own food,</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600" >Stay at <Text className="text-amber-500">home</Text></Text>

        </View>

        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[5px]">
          <TextInput value={textRecipe} onChangeText={onTextChange}  placeholder='Search by ingredient' placeholderTextColor={"gray"} style={{ fontSize: hp(2.7) }} className=" placeholder:text-3xl flex-1 text-base mb-1 pl-3 tracking-wider" />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Category section */}
        <View>
          {
            categories.length > 0 && <Categories categories={categories} handleChangeCategory={handleChangeCategory} setActiveCategory={setActiveCategory} />
          }
        </View>

        {/* Recipe */}
        <View>
          <Recipe meals={meals} categories={categories} />
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})