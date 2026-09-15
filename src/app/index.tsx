import { Platform, StyleSheet, TextInput, Pressable, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { router } from 'expo-router';
 

export default function HomeScreen() {
  const [tripName, setTripName] = useState('');
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState<string[]>([]);             // packing list in memory
  const [packed, setPacked] = useState<string[]>([]); 

  function addItem() {
    const inputNewItem = newItem.trim();
    if (! inputNewItem) return;
    setItems([...items, inputNewItem]);                         // add to the list, [...items, label] = old list + new item
    setNewItem('');                                             // clear the box after add
  }

  function deleteItem(item:string) {
    setItems(items.filter((x) => x !== item));
    setPacked(packed.filter((x) => x !== item));
  }



  function togglePacked(aItem:string) {
    if (packed.includes(aItem)){
      setPacked(packed.filter((x) => x !== aItem));             // .filter(...) builds a new list, keeping only some items.                                                            
    } else {                                                    // (x) => x !== aItem means: keep x if it is not the one we tapped.
      setPacked([...packed, aItem]);
    }
  }
  
  function screenCheckList() {
    router.push({
      pathname: '/checkList',
      params: {
        tripName,
        items: JSON.stringify(items),
        packed: JSON.stringify(packed),
      }
    });
  }
  
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ThemedView style={styles.heroSection}>

          <TextInput 
            value={tripName}
            onChangeText={setTripName}
            placeholder='Click to Enter Trip Name...'
            style={styles.tripNameInput}
            >
          </TextInput>

          <TextInput
            value={newItem}
            onChangeText={setNewItem}
            placeholder='Enter items...'
            style={styles.input}
            >
          </TextInput>

          <Pressable onPress={addItem}>
            <Text style={styles.buttonAdd}>Add</Text>
          </Pressable>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {items.map((inputNewItem) => {
              return (
                <View key={inputNewItem} style={styles.inputNewItem}>
                  <ThemedText style={styles.items}>
                    {inputNewItem}
                  </ThemedText>

                  <Pressable onPress={()=> deleteItem(inputNewItem)}>
                    <Text style={styles.buttonDelete}> Delete</Text>
                  </Pressable>
                </View>
              );
            })} 
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
        
      <Pressable onPress={screenCheckList} style={styles.checkListButton}>
        <Text style={styles.checkListText}>CHECK LIST</Text>
      </Pressable>


      {Platform.OS === 'web' && <WebBadge />}
     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    maxWidth: MaxContentWidth,
    width: '100%'
  },

  heroSection: {
    width:'100%',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },

  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  inputNewItem: {
     flexDirection: 'row', 
     alignItems: 'center', 
     justifyContent: 'space-between'
  },

  tripNameInput: {
    fontSize: 26,
    fontWeight: '600',
  },

  buttonAdd: {
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',            
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#3fed05',
    borderRadius: 20,
  },

  buttonDelete: {
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',            
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f7382a',
    borderRadius: 20,
  },

  items: {
    textAlign: 'left',
  },

  checkListButton: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 0,
  },
  
  checkListText: {
    fontWeight: '600',
  },

});
