import { FunctionComponent, useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput, styled, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export interface FiltersProps {
  onSearch: (val: string) => void;
  /** Default value is 500 */
  debounceTime?: number;
  onFilterFromDate: (val: moment.Moment | null) => void;
  onFilterToDate: (val: moment.Moment | null) => void;
}

const FromField = styled(TextField)({
  width: 200,
  "& .MuiOutlinedInput-notchedOutline": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
});
const ToField = styled(TextField)({
  width: 200,
  "& .MuiOutlinedInput-notchedOutline": {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
});

const Filters: FunctionComponent<FiltersProps> = ({ onSearch, debounceTime = 500, onFilterFromDate, onFilterToDate }) => {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState<moment.Moment | null>(null);
  const [toDate, setToDate] = useState<moment.Moment | null>(null);
  const router = useRouter();

  useEffect(() => {
    setSearch("");
    setFromDate(null);
    setToDate(null);
  }, [router.query.type]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSearch(val);
    debounce(onSearch, debounceTime)(val);
  };

  const handleFromDateChange = (val: moment.Moment | null) => {
    setFromDate(val);
    onFilterFromDate(val);
  };

  const handleToDateChange = (val: moment.Moment | null) => {
    setToDate(val);
    onFilterToDate(val);
  };

  return (
    <div>
      <FormControl size="small" sx={{ mr: 1 }}>
        <OutlinedInput
          value={search}
          id="search"
          onChange={handleSearch}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          componentsProps={{ actionBar: { actions: ["clear"] } }}
          label="From Date"
          value={fromDate}
          onChange={handleFromDateChange}
          renderInput={params => <FromField {...params} size="small" />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          componentsProps={{ actionBar: { actions: ["clear"] } }}
          label="To Date"
          value={toDate}
          onChange={handleToDateChange}
          renderInput={params => <ToField {...params} size="small" />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Filters;
