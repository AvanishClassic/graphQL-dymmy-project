import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DialogButton } from "../dialogButton";
import { ProductCardProps } from "../../domain/home/type";
import { useEffect } from "react";

type FeatureModalProps = {
  mode: string;
  handleClose: () => void;
  currentlItem: ProductCardProps;
};

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: number;
};

const FeatureModal = ({
  currentlItem,
  mode,
  handleClose,
}: FeatureModalProps) => {
  const { handleSubmit, register, setValue } = useForm<FormData>({
    defaultValues: currentlItem,
  });
  const submitHandler = (evt: any) => {
    console.log("object", evt);
  };
  console.log(currentlItem, "currentlItem");

  useEffect(() => {
    setValue("firstName", currentlItem.firstName);
    setValue("lastName", currentlItem.lastName);
    setValue("phoneNumber", currentlItem.phoneNumber!);
  }, [currentlItem]);

  return (
    <Dialog
      open={!!mode}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      {!!mode && (
        <Box padding={"30px"}>
          <DialogTitle>
            <Box textAlign={"center"}>
              <Typography fontWeight={700} fontSize={24} color="text.secondary">
                {mode.toUpperCase()} new Location
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormGroup>
                <FormControl sx={{ marginTop: "30px" }}>
                  <TextField
                    // value={getValues().}
                    label="First Name"
                    {...register("firstName", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </FormControl>
                <FormControl sx={{ marginTop: "30px" }}>
                  <TextField
                    // value={currentlItem.lastName}
                    label="Last Name"
                    {...register("lastName", { required: true, maxLength: 20 })}
                  />
                </FormControl>

                <FormControl sx={{ marginTop: "30px" }}>
                  <TextField
                    // value={currentlItem.phoneNumber}
                    label="Phone Number"
                    {...register("phoneNumber", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </FormControl>

                <DialogActions sx={{ marginTop: "20px" }}>
                  <DialogButton type="submit">Add</DialogButton>
                  <DialogButton onClick={handleClose}>Cancel</DialogButton>
                </DialogActions>
              </FormGroup>
            </form>
          </DialogContent>
        </Box>
      )}
    </Dialog>
  );
};

export default FeatureModal;
