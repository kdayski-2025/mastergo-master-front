# Руководство по сборке APK

1. Установите EAS CLI:  
   `npm install -g eas-cli`  

2. Авторизуйтесь:  
   `eas login`  

3. Билд eas:
   `eas build:configure`

4. Соберите APK:  
   `eas build -p android --profile preview`  

5. Для iOS:  
   `eas build -p ios --profile preview`  

Документация: https://docs.expo.dev/build/setup/, https://docs.expo.dev/build-reference/apk/

# Запустк приложения  
   `npm start`  