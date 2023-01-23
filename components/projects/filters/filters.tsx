import { FunctionComponent, useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";

interface FiltersProps {
  onSearch: (val: string) => void;
  /** Default value is 500 */
  debounceTime?: number;
}

const Filters: FunctionComponent<FiltersProps> = ({ onSearch, debounceTime = 500 }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSearch("");
  }, [router.query.type]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSearch(val);
    debounce(onSearch, debounceTime)(val);
  };

  return (
    <div>
      <FormControl size="small">
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
    </div>
  );
};

export default Filters;
