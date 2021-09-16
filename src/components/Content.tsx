import React from "react";
import { Card, CardContent, Container, Grid } from "@material-ui/core";

export interface Props<T> {
  items: Array<{ id: T; title: string; image: string }>;
  onRemove: (t: T) => void;
}

export function Content<T extends string | number>(props: Props<T>) {
  return (
    <Container maxWidth={"md"}>
      <Grid container justifyContent={"center"} spacing={2}>
        {props.items.map((i) => (
          <Grid key={i.id} item>
            <Card>
              <CardContent>
                <div className="img">
                  <img src={i.image} alt={i.image} width={200} />
                </div>
                <div className="title">{i.title}</div>
                <button className="remove" onClick={() => props.onRemove(i.id)}>
                  Remove
                </button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
