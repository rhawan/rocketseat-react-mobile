import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import socket from "socket.io-client";

import styles from "./styles";
import api from "../../services/api";

export default class Box extends Component {
  state = {
    boxes: []
  };

  async componentDidMount() {
    const response = await api.get("boxes");

    this.setState({ boxes: response.data });
  }

  handleSelectBox = async (box) => {
    console.log("selected box", box);
    await AsyncStorage.setItem("@RocketBox:box", box);
    this.props.navigation.navigate("Box");
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.handleSelectBox(item._id)} style={styles.file}>
      <View style={styles.fileInfo}>
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>

      <Text style={styles.fileDate}>
        há{" "}
        {distanceInWords(item.createdAt, new Date(), {
          locale: pt
        })}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          style={styles.list}
          data={this.state.boxes}
          keyExtractor={box => box._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
