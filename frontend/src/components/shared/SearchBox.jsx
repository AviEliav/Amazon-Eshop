import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFilterUrl } from "../../utils"


const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    const filterURI = getFilterUrl(search, { query: query })
    navigate(filterURI);
  }

  useEffect(() => {
    if (!query) {
      return
    }
    const filterURI = getFilterUrl(search, { query: query })
    navigate(filterURI)
  }, [query])

  return (
    <Form className="d-flex me-auto w-50">
      <InputGroup>
        <FormControl
          aria-describedby="button-search"
          placeholder="Search for products"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline-primary" type="submit" id="button-serach">
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox