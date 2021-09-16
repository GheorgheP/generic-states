import React from "react";
import { ButtonGroup, Button, Container, Grid } from "@material-ui/core";

export interface Props<T> {
  active: T;
  items: Array<{ id: T; title: string }>;
  onClick: (t: T) => void;
}

export function TopBar<T extends string | number>(props: Props<T>) {
  return (
    <Container>
      <Grid container justifyContent={"center"}>
        <ButtonGroup>
          {props.items.map((i) => (
            <Button
              key={i.id}
              onClick={() => props.onClick(i.id)}
              color={"primary"}
              variant={props.active === i.id ? "contained" : "outlined"}
            >
              {i.title}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Container>
  );
}
