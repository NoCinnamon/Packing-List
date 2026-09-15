import { useLocalSearchParams } from 'expo-router';
import { Text, View, Pressable, StyleSheet, } from 'react-native';


export default function CheckListScreen() {
  const params = useLocalSearchParams();

  const tripName = String(params.tripName ?? '')                      // use tripName, or ' ' if missing
  const items: string[] = JSON.parse(String(params.items ?? '[]'))    // force a string (params can be string | string[])
  const packed: string[] = JSON.parse(String(params.packed ?? '[]'))  // turn "[\"Water\",\"Food\"]" into ["Water","Food"]

  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={styles.tripName}>
        {tripName + ':'|| 'My Trip:'}
      </Text>

      {items.map((item) => (
      <Text key={item} style={styles.itemList}>
        {item}
      </Text>           
    ))}
    </View>
)};

const styles = StyleSheet.create({
  tripName: {
    fontSize: 22, 
    fontWeight: '600',
  },

  itemList: {
    fontSize: 18,
  }
});

