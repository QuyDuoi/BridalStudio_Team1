import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Text, TextInput, View } from 'react-native';


const SearchBar = () => {

    return (
        <View>
            <TextInput
                placeholder='Tìm kiếm...'
                style={{
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginVertical: 15,
                    marginHorizontal: 20,
                    paddingLeft: 30,
                    fontSize: 17,
                }}
            />
        </View>
    );
};

export default SearchBar;