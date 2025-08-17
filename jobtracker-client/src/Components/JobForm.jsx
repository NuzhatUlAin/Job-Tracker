import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    companyName: yup.string().required(),
    role: yup.string().required(),
    status: yup.string().required(),
    dateApplied: yup.date().required(),
});

export default function JobForm({ defaultValues, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Company Name" {...register("companyName")} error={!!errors.companyName} helperText={errors.companyName?.message} fullWidth margin="normal" />
            <TextField label="Role" {...register("role")} error={!!errors.role} helperText={errors.role?.message} fullWidth margin="normal" />
            <TextField select defaultValue={defaultValues.status} label="Status" {...register("status")} fullWidth margin="normal">
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
            <TextField type="date" {...register("dateApplied")} fullWidth margin="normal" />
            <TextField label="Notes" {...register("notes")} multiline rows={3} fullWidth margin="normal" />
            <TextField label="Resume Link" {...register("resumeLink")} fullWidth margin="normal" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
        </form>
    );
}
