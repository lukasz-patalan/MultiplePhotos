import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  elementsWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  fleshWrapper: {
    position: "absolute",
    left: "5%",
    top: "10%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  takeImgWrapper: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  takImgBttn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
    left: 3,
    justifyContent: "center",
  },
  startCameraBttn: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#14274e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  startCameraTxt: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  takePhotoBttnWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  flashBttn: {
    borderRadius: 100,
    height: 25,
    width: 25,
  },
  mainWrapper: {
    flex: 1,
    width: "100%",
  },
});
