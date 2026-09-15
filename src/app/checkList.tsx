import { useLocalSearchParams, router } from 'expo-router';
import { Text, View, Pressable, StyleSheet, Alert } from 'react-native';


export default function CheckListScreen() {
  const params = useLocalSearchParams();

  const tripName = String(params.tripName ?? '')                      // use tripName, or ' ' if missing
  const items: string[] = JSON.parse(String(params.items ?? '[]'))    // force a string (params can be string | string[])
  const packed: string[] = JSON.parse(String(params.packed ?? '[]'))  // turn "[\"Water\",\"Food\"]" into ["Water","Food"]

  function deleteAll(){
    Alert.alert(
      'Are you SURE?',
      'It will delete the whole paking list.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', 
        onPress:() => {
          router.replace({                                                  // replace = go to Pack and replace this screen (back won’t return to the old list).
            pathname: '/',                                                  // clear: '1' = note for Pack: “wipe everything.”
            params: { clear: '1'},
          });
        }}
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.tripName}>
          {(tripName || 'My Trip') + ':'}
        </Text>

        {items.map((item) => (
        <Text key={item} style={styles.itemList}>
          {item}
        </Text>           
        ))}
      </View>

      <Pressable onPress={deleteAll} style={styles.buttonDeleteAll}>
        <Text style={styles.deleteAllText}>Delete All</Text>
      </Pressable>
    </View>

)};

const styles = StyleSheet.create({

  container:{
    flex: 1,
  },

  content: {
    flex: 1, 
    padding: 24, 
    gap: 12 
  },

  tripName: {
    fontSize: 22, 
    fontWeight: '600',
  },

  itemList: {
    fontSize: 18,
  },

  buttonDeleteAll: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 0,
  },

  deleteAllText: {
    fontWeight: '600',
  },
});

