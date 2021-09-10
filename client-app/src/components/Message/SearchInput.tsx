import React from "react"
import { Header, Input } from "semantic-ui-react"

export const SearchInput = () => {
    return (
        <Header floated="right">
            <Input
                size="small"
                icon="search"
                name="searchTerm"
                placeholder="Search messages"
            ></Input>
        </Header>
    )
}