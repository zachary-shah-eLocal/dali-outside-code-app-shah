import { createContext, useState, useContext } from 'react'
import { BackTrigger } from '../../atoms'
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { styles } from './TabsStyles';

interface TabContextType {
    tab: string;
    setTab:  (value: string) => void;
    handleTabChange:  (value: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const useTabs = () => {
    const context = useContext(TabContext)
    if (context === undefined) {
        throw new Error('useTabs must be used inside TabContextProvider')
    }
    return context
}

interface TabsProps {
    children: any;
    initialTab: string | (() => string);
    onTabChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ children, initialTab, onTabChange }) => {
    const [tab, setTab] = useState<string>(initialTab)
  
    const handleTabChange = (value: any) => {
      setTab(value)
      if (onTabChange) {
        onTabChange(value)
      }
    }
  
    return (
      <TabContext.Provider value={{ tab, setTab, handleTabChange }}>
        <View style={styles.Tabs}>{children}</View>
      </TabContext.Provider>
    )
}

interface TabListProps {
    children: any;
    center?: boolean;
}

export const TabList: React.FC<TabListProps> = ({ children, center }) => {
    const conditionStyles = StyleSheet.create({
        tabList: {
          ...(center ? { alignItems: 'center' } : {}),
        },
    });

    const combinedStyles = [
        styles.tabList,
        conditionStyles.tabList
    ]

    return (
      <View style={combinedStyles as any}>
        {children}
        <View style={styles.tabFill}/>
      </View>
    )
}

interface TabProps {
    children: any;
    value: string;
}

export const Tab: React.FC<TabProps> = ({ children, value }) => {
    const { tab, handleTabChange } = useTabs()

    if(tab === value) {
        return (
        <TouchableOpacity style={styles.tabSelected} onPress={() => handleTabChange(value)} role="tab">
            {children}
        </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity style={styles.Tab} onPress={() => handleTabChange(value)} role="tab">
                {children}
            </TouchableOpacity>
            )
    }
  }
  
  export const TabPanel: React.FC<TabProps> = ({ children, value}) => {
    const { tab } = useTabs()
    if (tab !== value) {
      return null
    }
    return (
      <View style={[styles.tabPanel]}>
        {children}
      </View>
    )
  }