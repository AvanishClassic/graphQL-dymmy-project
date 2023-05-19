import {
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

import { CardWrapper } from "../../component/cardWrapper";
import { ProductCardProps } from "./type";

const ProductCard = ({
  name,
  updatedAt,
  status,
  telecom,
}: ProductCardProps) => {
  return (
    <CardWrapper>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <>
                <Typography fontSize={16} fontWeight={700} color="text.primary">
                  {name}
                </Typography>
              </>
              <>
                <Typography fontSize={16} color="text.secondary">
                  {telecom[0].value}
                </Typography>
              </>
              <>
                <Typography mt={2} fontSize={16} color="text.secondary">
                  {updatedAt}
                </Typography>
              </>
            </Grid>
            <Grid sx={{ textAlign: "end" }} item xs={4}>
              <Chip label={status} color="secondary" />
              <>
                <Typography mt={4} fontSize={16} color="text.secondary">
                  0 y
                </Typography>
              </>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </CardWrapper>
  );
};

export default ProductCard;
