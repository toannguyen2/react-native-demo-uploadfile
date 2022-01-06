import React, { Component } from "react";
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text, TouchableWithoutFeedback,
	View,
} from "react-native";
import * as DocumentPicker from "react-native-document-picker";


class App extends Component {
	constructor(props: any) {
		super(props);
	}

	state: {
		singleFile: null
	}

	render() {
		const bindEventButton = this._onPressButton.bind(this);
		return (
			<View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
				<SafeAreaView>
					<View style={styles.container}>
						<Text style={styles.title}>
							Upload file demo by Toản Nguyễn.
						</Text>
						<View style={[ styles.mt_10, {
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center"
						} ]}>

							<TouchableWithoutFeedback onPress={bindEventButton}>
								<View style={[ styles.mt_10, styles.button, {
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									textAlign: "center"
								} ]}>
									<Text style={[ styles.buttonText ]}>Select file.</Text>
								</View>
							</TouchableWithoutFeedback>

							<View style={[ styles.mt_10, styles.button, {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textAlign: "center"
							} ]}>
								<Text style={[ styles.buttonText ]}>Select photo.</Text>
							</View>

							<View style={[ styles.mt_10, styles.button, {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textAlign: "center"
							} ]}>
								<Text style={[ styles.buttonText ]}>Camera.</Text>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</View>
		);
	}
	async _onPressButton() {
		try {
			const fileSelect = await DocumentPicker.pick({
				type: [ DocumentPicker.types.allFiles ],
			});
			console.log("fileSelect", fileSelect[0], fileSelect[0].name);

			const data = new FormData();
			data.append('name', 'Image Upload');
			data.append('file', fileSelect[0], fileSelect[0].name);

			console.log(data);

			// formData.append("upload", file, file.name);
			let response = await fetch(
				'http://192.168.90.121:64632/v1/tptRequest/uploadFiles',
				{
					method: 'post',
					body: data,
					headers: {
						'Content-Type': 'multipart/form-data; ',
					},
				}
			);
			let responseJson = await response.json();
			console.log(responseJson)
			if (responseJson.status === 1) {
				// eslint-disable-next-line no-alert
				alert('Upload Successful');
			}
		}
		catch (e) {
			console.log(e.message);
		}

	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		margin: 32,
		padding: 24,

		borderRadius: 10,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},

	mt_5: {
		marginTop: 5,
	},

	mt_10: {
		marginTop: 10,
	},

	title: {
		fontSize: 18,
	},

	button: {
		backgroundColor: '#0759b8',
		padding: 15,
		display: "flex",
		width: 200,
		borderRadius: 5,
	},

	buttonText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: "bold",
	}
});

export default App;
