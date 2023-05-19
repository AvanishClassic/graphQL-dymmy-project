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
import { useMutation } from "@apollo/client";
import {
  ADD_LOCATION,
  REMOVE_LOCATION,
  UPDATE_LOCATION,
} from "../../gqloperation/mutation";

type FeatureModalProps = {
  mode: string;
  handleClose: () => void;
  currentlItem: ProductCardProps;
};

type FormData = {
  name: string;
  description: string;
  phoneNumber: string;
  taxId: string;
  address: string;
};

const FeatureModal = ({
  currentlItem,
  mode,
  handleClose,
}: FeatureModalProps) => {
  const { handleSubmit, register, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      name: currentlItem.name,
      description: currentlItem.description,
      phoneNumber: currentlItem.telecom[0].value,
      taxId: currentlItem.taxId,
      address: currentlItem.address,
    },
  });
  const [removeLocation] = useMutation(REMOVE_LOCATION);
  const [addLocation] = useMutation(ADD_LOCATION);
  const [updateLocation] = useMutation(UPDATE_LOCATION);

  useEffect(() => {
    setValue("name", currentlItem.name);
    setValue("description", currentlItem.description);
    setValue("phoneNumber", currentlItem.telecom[0].value);
    setValue("address", currentlItem.address);
    setValue("taxId", currentlItem.taxId);
  }, [currentlItem]);

  const submitHandler = async (evt: FormData) => {
    await addLocation({
      variables: {
        tenant: "940e8edf-edd9-401d-a21a-10f866fbdb3f",
        locationUpdateId: currentlItem.id,
        requestBody: {
          address: evt.address,
          taxId: "123",
          name: evt.name,
          telecom: [
            {
              value: evt.phoneNumber,
              system: "phone",
            },
          ],
          npi: "xyz",
          description: evt.description,
          updatedAt: 1666339138512,
          alias: "compress",
          status: "active",
        },
      },
    });
    handleClose();
  };

  const handleEdit = async () => {
    const { name, description, address, taxId, phoneNumber } = getValues();
    await updateLocation({
      variables: {
        tenant: "940e8edf-edd9-401d-a21a-10f866fbdb3f",
        locationUpdateId: currentlItem.id,
        requestBody: {
          ...currentlItem,
          name,
          description,
          address,
          taxId,
          telecom: [
            {
              system: "phone",
              value: phoneNumber,
            },
            currentlItem.telecom[1],
          ],
        },
      },
    });
    handleClose();
  };

  const handleDelete = async () => {
    await removeLocation({
      variables: {
        tenant: "940e8edf-edd9-401d-a21a-10f866fbdb3f",
        locationRemoveId: currentlItem.id,
      },
    });
  };

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
                    label=" Name"
                    {...register("name", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </FormControl>
                <FormControl sx={{ marginTop: "30px" }}>
                  <TextField
                    // value={currentlItem.lastName}
                    label="Description"
                    {...register("description", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </FormControl>
                <FormControl sx={{ marginTop: "30px" }}>
                  <TextField
                    // value={currentlItem.lastName}
                    label="Address"
                    {...register("address", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </FormControl>
                <FormControl sx={{ marginTop: "30px" }}>
                  <TextField
                    // value={currentlItem.lastName}
                    label="Tax ID"
                    {...register("taxId", {
                      required: true,
                      maxLength: 20,
                    })}
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
                  {mode === "add" ? (
                    <DialogButton type="submit">Add</DialogButton>
                  ) : (
                    <>
                      <DialogButton onClick={() => handleDelete()}>
                        Delete
                      </DialogButton>
                      <DialogButton onClick={() => handleEdit()}>
                        Edit
                      </DialogButton>
                    </>
                  )}
                  <DialogButton onClick={handleClose}>Close</DialogButton>
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
