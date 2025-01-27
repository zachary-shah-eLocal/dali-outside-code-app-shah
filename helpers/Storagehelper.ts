import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageHelper {
  static use = async (key: string, defaultValue: any) => {
    const value = await StorageHelper.get(key);
    if (value) {
      return value;
    }
    await StorageHelper.set(key, defaultValue);
    return defaultValue;
  };
  static get = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting data from storage", error);
      return null;
    }
  };

  static set = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting data in storage", error);
    }
  };

  static update = async (key: string, value: any) => {
    try {
      const res = await this.get(key);
      if (res) {
        await this.set(key, { ...res, ...value });
      }
    } catch (error) {
      console.error("Error updating data in storage", error);
    }
  };

  static remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from storage", error);
    }
  };

  static clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage", error);
    }
  };
}
