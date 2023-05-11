import React, { useState, useEffect } from 'react';
import Lib from '../Lib'
import Table from './Table'

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Home = () => {
	//
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	//
	const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [src20, setSRC] = useState([]);

	useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      var test =  await Lib.getData();
      setSRC(test);
      setLoading(false)
    }
    // call the function
    fetchData()

		//Implementing the setInterval method
		const interval = setInterval(() => {
			setCount(count + 1);
		}, 300000);

		//Clearing the interval
		return () => clearInterval(interval);
	}, [count]);


	return <div style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>

          <h1 style={{color:"#f2a900",fontSize: matches? 30 : 24, paddingTop: matches ? 30 : 16, paddingLeft:8}}>
						SRC-20 <span style={{fontSize: matches? 16 : 12}}>({loading ? '..' : src20.length} tokens)</span>
				  </h1>
          <Table src20={src20} loading={loading} matches={matches}/>

  			</div>
}

export default Home;
