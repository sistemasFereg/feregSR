import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from '../../assets/styles/variables';

class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {this.props.title ? this.props.title : ""}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.darkPrimary,
    maxHeight: 48,
    height: 48,
    borderColor: COLORS.lightGray,
    borderStyle: "solid",
    borderBottomWidth: 4,
    borderBottomColor: COLORS.lightGray
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
    paddingTop: 6
  },
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
  }
});

export default CustomHeader;
