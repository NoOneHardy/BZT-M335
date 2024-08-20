# Release

1. **Setup project**: [README](../README.md#setup)
2. **Generate files for android**: ```ionic cap sync```
3. **Open Android Studio**: ```ionic cap open android```
4. **Generate APK**:
   1. Select Build > Generate Signed App Bundle / APK
      ![](./assets/build_apk_location.png)
   2. Select APK and continue
      ![](./assets/build_apk_select.png)
   3. Create a new key store
      ![](./assets/build_apk_key_store.png)
   4. Select a path, a store password, a key password, enter your name and continue
      ![](./assets/build_apk_new_key_store.png)
   5. Check data and continue
      ![](./assets/build_apk_key_store_continue.png)
   6. Select release and continue (change the output path if necessary)
      ![](./assets/build_apk_release.png)
   7. Your APK is located in the path specified in vi
      ![](./assets/build_apk_result.png)
