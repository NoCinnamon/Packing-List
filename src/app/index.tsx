import { Platform, StyleSheet, TextInput, Pressable, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const STORAGE_KEY = 'packing-trip'

export default function HomeScreen() {
  const params = useLocalSearchParams<{clear?: string | string[]}> ();
  const clear = String(params.clear ?? '');

  const [tripName, setTripName] = useState('');
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState<string[]>([]);             // packing list in memory
  const [packed, setPacked] = useState<string[]>([]); 

  useEffect(() => {
    let cancelled = false;
    
    async function syncTrip() {
      if (clear === '1') {
        setTripName('');
        setNewItem('');
        setItems([]);
        setPacked([]);

        await AsyncStorage.removeItem(STORAGE_KEY);
        if (!cancelled) {
          router.replace('/');
        }
        return;
      }
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (cancelled || !raw) return;
      const data = JSON.parse(raw);
      setTripName(data.tripName ?? '');
      setItems(data.items ?? []);
      setPacked(data.packed ?? []);
    }
    syncTrip();
    return () => {
      cancelled = true;
    };
  }, [clear]);

  async function saveTrip(
    nextTripName: string,
    nextItems: string[],
    nextPacked: string[],
  ) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tripName: nextTripName,
        items: nextItems,
        packed: nextPacked,
      })
    );
  }

  function addItem() {
    const inputNewItem = newItem.trim();
    if (! inputNewItem) return;

    const nextItems = [...items,inputNewItem]
    setItems([...items, inputNewItem]);                         // add to the list, [...items, label] = old list + new item
    setNewItem('');                                             // clear the box after add
    saveTrip(tripName, nextItems, packed);
  }

  function deleteItem(item:string) {
    const nextItems = items.filter((x) => x !== item);
    const nextPacked = packed.filter((x) => x !== item);

    setItems(nextItems);
    setPacked(nextPacked);
    saveTrip(tripName, nextItems, nextPacked);
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

      <Image
      source={require('../../assets/images/suitcase.png')}
      style={styles.image} 
      resizeMode="contain"
      />

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
        
      <Pressable onPress={screenCheckList} style={styles.buttonCheckList}>
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

  image: {
   
    justifyContent: 'center',
    width: "30%", 
    height: 60, 
    marginTop: 20, 
    alignSelf:'center', 
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

  buttonCheckList: {
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
