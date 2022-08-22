import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  FlashMode,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Preview from "./Preview";
import { styles } from "./styles";

let camera: Camera;
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImages, setCapturedImages] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<any>(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const [flashMode, setFlashMode] = React.useState("off");

  const askPermission = async () => {
    await MediaLibrary.requestPermissionsAsync();
  };
  useEffect(() => {
    askPermission();
  }, []);

  const handleStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const handleTakePicture = async () => {
    setIsLoading(true);
    const photo1: CameraCapturedPicture = await camera.takePictureAsync({
      skipProcessing: true,
    });
    const photo2 = await camera.takePictureAsync({ skipProcessing: true });
    const photo3 = await camera.takePictureAsync({ skipProcessing: true });
    const photo4 = await camera.takePictureAsync({ skipProcessing: true });
    const photo5 = await camera.takePictureAsync({ skipProcessing: true });
    setCapturedImages([
      photo1.uri,
      photo2.uri,
      photo3.uri,
      photo4.uri,
      photo5.uri,
    ]);
    setIsLoading(false);
    setPreviewVisible(true);
  };
  const handleSavePhoto = async () => {
    setIsSaving(true);
    await MediaLibrary.saveToLibraryAsync(capturedImages[0]);
    await MediaLibrary.saveToLibraryAsync(capturedImages[1]);
    await MediaLibrary.saveToLibraryAsync(capturedImages[2]);
    await MediaLibrary.saveToLibraryAsync(capturedImages[3]);
    await MediaLibrary.saveToLibraryAsync(capturedImages[4]);
    setIsSaving(false);
    setIsSaved(true);
  };

  const handleRetakePicture = () => {
    setIsSaved(false);
    setCapturedImages(null);
    setPreviewVisible(false);
    handleStartCamera();
  };
  const handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.mainWrapper}>
          {previewVisible && capturedImages?.[0] ? (
            <Preview
              photo={capturedImages[0]}
              savePhoto={handleSavePhoto}
              retakePicture={handleRetakePicture}
              isSaved={isSaved}
              isSaving={isSaving}
            />
          ) : (
            <Camera
              useCamera2Api
              type={Camera.Constants.Type.back as CameraType}
              flashMode={flashMode as FlashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View style={styles.elementsWrapper}>
                <View style={styles.fleshWrapper}>
                  <TouchableOpacity
                    onPress={handleFlashMode}
                    style={{
                      backgroundColor: flashMode === "off" ? "#000" : "#fff",
                      ...styles.flashBttn,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.takeImgWrapper}>
                  <View style={styles.takePhotoContainer}>
                    <TouchableOpacity
                      onPress={isLoading ? () => {} : handleTakePicture}
                      style={{
                        ...styles.takImgBttn,
                        opacity: isLoading ? 0.5 : 1,
                      }}
                    >
                      {isLoading && (
                        <ActivityIndicator size="large" color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View style={styles.takePhotoBttnWrapper}>
          <TouchableOpacity
            onPress={handleStartCamera}
            style={styles.startCameraBttn}
          >
            <Text style={styles.startCameraTxt}>open camera</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
