import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../stysles/theme";
import {ArrowLeft } from "lucide-react-native"

const BackButton = ({ size, onPress, customStyle }) => {
	return (
		<Pressable onPress={onPress} style={[styles.button, customStyle]}>
			<ArrowLeft name="chevron-back" size={size} color={COLORS.white} />
		</Pressable>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	button: {
		padding: 5,
		alignSelf: "flex-start",
	},
});
