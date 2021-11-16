import React, { useContext, useState } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import {
  Accordion,
  HStack,
  Text,
  VStack,
  Divider,
} from 'native-base';
import _ from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppDataContext from "../contexts/AppData";
import AddCitiesAndFruitesModal from "../components/AddCitiesAndFruitesModal";


const HomeScreen = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const {state, isLoading} = useContext(AppDataContext);
    const [showModal, setShowModal] = useState(false);
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button onPress={() => setShowModal(true)} title="Add" />,
      });
    }, [navigation]);
    
    const getTotalStockOfCity = (data) => {
        const count = _.sumBy(data.fruits_stock, 'stock');

        return count || 0;
    }

    if(isLoading){
        return <ActivityIndicator size={30} />
    }

    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingBottom: insets.bottom,
          }}>
          {state && !isLoading && Array.isArray(state) && (
            <Accordion index={[0]}>
              {state.map((city) => (
                <Accordion.Item key={city.city_name}>
                  <Accordion.Summary
                    _text={{
                      fontSize: 'md',
                      fontWeight: 'bold',
                    }}>
                    {`${city.city_name} (${getTotalStockOfCity(city)})`}
                    <Accordion.Icon />
                  </Accordion.Summary>
                  <Accordion.Details>
                    <VStack space={3} divider={<Divider />} w="90%">
                      {city?.fruits_stock?.map?.((stock) => (
                        <HStack
                          key={city.city_name + stock.name}
                          justifyContent="space-between">
                          <Text>{`${stock.name} (${stock.stock})`}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Accordion.Details>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          <Button
            title="Transfer Stock"
            onPress={() => navigation.navigate('Transfer')}
          />
        </View>

        <AddCitiesAndFruitesModal showModal={showModal} onClose={() => setShowModal(false)} />
      </>
    );
}




export default HomeScreen;