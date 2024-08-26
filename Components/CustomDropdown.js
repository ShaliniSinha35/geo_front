import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const CustomDropdown = ({ options, selectedValue, onValueChange }) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearch = (text) => {
    console.log(text)
    setQuery(text);
    console.log(options)
    const filtered = options.filter(option =>
      option.workid?.toLowerCase().includes(text.toLowerCase())
    );
    console.log(filtered)
    setFilteredOptions(filtered);
  };
  

  const handleSelect = (itemValue) => {
    onValueChange(itemValue);
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        style={styles.dropdown}
        data={filteredOptions}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item.value)}>
            <Text style={styles.option}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height:200
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdown: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDropdown;
