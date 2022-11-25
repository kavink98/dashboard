import { useEffect, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DataTable from './Components/DataTable';
import Chart from './Components/Chart'
import axios from 'axios';
import { chain, set, uniq } from 'lodash';

function App() {

  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [revenueList, setRevenueList] = useState([]);
  let completeRevenueList = [
    "Revenue Type -11",
    "Revenue Type -7",
    "Revenue Type -3",
    "Revenue Type -5",
    "Revenue Type -6",
    "Revenue Type -1",
    "Revenue Type -4"
  ];

  const formatData = (arr) => {

    arr = arr.map(datapoint => {
      const date = datapoint.month + " " + datapoint.year;
      return {
        date: date,
        product: datapoint.product,
        acv: datapoint.acv
      }
    }).sort((a, b) => {
      return (new Date(a.date) - new Date(b.date))
    })

    return chain(arr)
      .groupBy('product')
      .map((data, product) => ({ name: product, data }))
      .value()
  }

  useEffect(() => {
    if (sessionStorage.getItem('data') == null) {
      axios.get('http://fetest.pangeatech.net/data').then(res => {
        console.log(res);
        sessionStorage.setItem('data', JSON.stringify(res.data));
        setData(res.data);
      })
    }
    else {
      setData(JSON.parse(sessionStorage.getItem('data')))
    }
    setRevenueList(completeRevenueList);
  }, [])

  useEffect(() => {
    setFormattedData(formatData(data));
  }, [data])

  useEffect(() => {
    revenueList && setData(JSON.parse(sessionStorage.getItem('data')).filter(item => revenueList.includes(item['revenue_type'])))
  }, [revenueList])

  const handleChange = async (event) => {
    const newRevenueList = event.target.value;
    setRevenueList(revenueList => (newRevenueList));
    console.log(newRevenueList);
    console.log(revenueList);

    console.log(data);
  };


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <FormControl colo sx={{ m: 1, minWidth: 120, mr: 2 }} size="small">
              <FormHelperText>Selector</FormHelperText>
              <Select
                value={revenueList}
                labelId="revenue-select"
                id="revenue-select"
                multiple
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {completeRevenueList && completeRevenueList.map(revenue => (
                  <MenuItem
                    key={revenue}
                    value={revenue}
                  >
                    {revenue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <Typography >Hi User</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container direction='column'>
        <Grid item>
          <Chart data={formattedData} />
        </Grid>
        <Grid item>
          <DataTable data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
