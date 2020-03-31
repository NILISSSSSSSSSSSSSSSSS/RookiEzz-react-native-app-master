
import React from 'react';
 
export const tabsDataAutoProps = {
  data: [],
  data2: [],
  changeIndex: function () {}
};
 
export const tabsData = React.createContext(
	tabsDataAutoProps
)