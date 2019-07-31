import { MaterialIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  circleActive,
  circleInactive,
  deleteIconColor,
  itemListText,
  itemListTextStrike,
} from '../constants';

const { width } = Dimensions.get('window');

interface IListItemProps {
  completeItem: (id) => void;
  incompleteItem: (id) => void;
  deleteItem: (id) => void;

  id: string;
  text: string;
  isCompleted: boolean;
}
class ListItem extends Component<IListItemProps, {}> {
  public onToggleCircle = () => {
    const { isCompleted, id, incompleteItem, completeItem } = this.props;

    if (isCompleted) {
      incompleteItem(id);
    } else {
      completeItem(id);
    }
  }

  public render() {
    const { text, deleteItem, id, isCompleted } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.onToggleCircle}>
            <View
              style={[
                styles.circle,
                isCompleted
                  ? { borderColor: circleActive }
                  : { borderColor: circleInactive },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted
                ? {
                    color: itemListTextStrike,
                    textDecorationLine: 'line-through',
                  }
                : { color: itemListText },
            ]}
          >
            {text}
          </Text>
        </View>
        {isCompleted ? (
          <View style={styles.button}>
            <TouchableOpacity onPressOut={() => deleteItem(id)}>
              <MaterialIcons
                name="delete-forever"
                size={24}
                color={deleteIconColor}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 15,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    margin: 10,
  },
  button: {
    marginRight: 10,
  },
});

export default ListItem;