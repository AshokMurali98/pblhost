import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import Attachments from "../components/Attachments";
import { Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProject from "../hooks/useProjectHook";
import { categoriesList } from "../utils/constants";
import moment from "moment";

const AddProjectCard = styled.div`
  background-color: whitesmoke;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px rgba(202, 239, 255, 0.43);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddProjectFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const MainGrid = styled.div`
  display: grid;
  ${({ gridTemplateArea }) =>
    gridTemplateArea
      ? `
        grid-template-areas: ${gridTemplateArea};
    `
      : ""}
  ${({ gap, gridColumn }) => `
        ${gap ? `gap: ${gap};` : ""}
        ${gridColumn ? `grid-template-columns: ${gridColumn};` : ""}
    `}
`;

const GridItem = styled.div`
  ${({ gridArea }) =>
    gridArea
      ? `
        grid-area: ${gridArea};
    `
      : ""}
  ${({ gap, flexColumn }) => `
        ${gap ? `gap: ${gap};` : ""}
        ${flexColumn ? `display: flex; flex-direction: column;` : ""}
    `}
`;

const validations = {
  sub: {
    required: "Please input Project Title",
  },
  shortIntro: {
    required: "Please input Short Intro",
  },
  desc: {
    required: "Please enter Description",
  },
  startDate: {
    required: "Please Add Start Date of the Project",
  },
  endDate: {
    required: "Please Add End Date of the Project",
  },
};

export default function AddProject() {
  const [projectFormData, setProjectFormData] = useState({
    sub: "",
    shortIntro: "",
    desc: "",
    status: "DRAFT",
    visibility: true,
    startDate: "",
    endDate: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState(categoriesList);
  const [newCategoryText, setNewCategoryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { addProject, updateProject } = useProject();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.type === "edit") {
      const { startDate, endDate, categories, attachments } = location?.state;
      setProjectFormData({
        ...location?.state,
        ...(startDate
          ? {
              startDate: moment(new Date(startDate)).format("YYYY-MM-DD"),
            }
          : {}),
        ...(endDate
          ? {
              endDate: moment(new Date(endDate)).format("YYYY-MM-DD"),
            }
          : {}),
      });
      setCategories(categories || []);
      setAttachments(attachments || []);
    }
  }, [location?.state]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let hasError = "";
      Object.keys(validations).forEach((item) => {
        if (!hasError && !projectFormData[item]?.trim()) {
          hasError = validations[item].required;
        }
      });
      if (hasError) throw new Error(hasError);
      const data = {
        ...projectFormData,
        attachments: attachments || [],
        categories: categories || [],
      };
      if (location?.state?.type === "edit") {
        await updateProject(
          {
            sub: data.sub,
            shortIntro: data.shortIntro,
            desc: data.desc,
            status: data.status,
            visibility: data.visibility,
            startDate: data.startDate,
            endDate: data.endDate,
            categories: categories || [],
            attachments: attachments || [],
          },
          location?.state?.id
        );
      } else {
        await addProject(data);
      }
      navigate("/myprojects");
    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryAdd = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCategories((prevState) => [...prevState, value]);
    } else {
      const index = categories.indexOf(value);
      if (index > -1) {
        setCategories((prevState) => {
          prevState.splice(index, 1);
          return [...prevState];
        });
      }
    }
  };

  const onValueChange = (e) => {
    const { value, name } = e.target;
    setProjectFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <MainGrid gridTemplateArea="'title title' 'left-section right-section' 'footer footer'" gap="1rem" gridColumn="2fr 1fr">
      <GridItem gridArea="title">
        <Typography variant="h5">Add New Project</Typography>
      </GridItem>
      <GridItem gridArea="left-section">
        <AddProjectCard>
          <TextField label="Project Title" variant="outlined" size="small" value={projectFormData.sub} name="sub" onChange={onValueChange} />
          <TextField
            label="Short intro about Project in 50 words."
            variant="outlined"
            size="small"
            multiline
            rows={2}
            value={projectFormData.shortIntro}
            name="shortIntro"
            onChange={onValueChange}
          />
          <TextField
            label="Description of 200 words."
            variant="outlined"
            size="small"
            multiline
            minRows={10}
            value={projectFormData.desc}
            name="desc"
            onChange={onValueChange}
          />
          <Attachments title="Add Attachments" onAttachment={setAttachments} />
        </AddProjectCard>
      </GridItem>
      <GridItem gridArea="right-section" flexColumn gap="1rem">
        <AddProjectCard>
          <TextField
            label="Project Start Date"
            variant="outlined"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={projectFormData.startDate}
            name="startDate"
            onChange={onValueChange}
          />
          <TextField
            label="Project End Date"
            variant="outlined"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={projectFormData.endDate}
            name="endDate"
            onChange={onValueChange}
          />
          <FormControl
            component="fieldset"
            sx={{
              paddingInline: "0.2rem",
            }}
          >
            <FormLabel component="legend">Privacy</FormLabel>
            <RadioGroup value={projectFormData.visibility} name="visibility" onChange={onValueChange}>
              <FormControlLabel value={true} control={<Radio size="small" />} label="Public" />
              <FormControlLabel value={false} control={<Radio size="small" />} label="Private" />
            </RadioGroup>
          </FormControl>
          <FormControl
            component="fieldset"
            sx={{
              paddingInline: "0.2rem",
            }}
            size="small"
          >
            <FormLabel component="legend">Status</FormLabel>
            <Select size="small" value={projectFormData.status} name="status" onChange={onValueChange}>
              <MenuItem value="DRAFT">Draft</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
        </AddProjectCard>
        <AddProjectCard>
          <FormControl component="fieldset">
            <FormLabel component="legend">Categories</FormLabel>
            <FormGroup style={{ maxHeight: "10rem", overflowY: "auto", flexWrap: "nowrap" }}>
              {categoryList.map((item) => (
                <FormControlLabel
                  key={item}
                  label={item}
                  value={item}
                  onChange={handleCategoryAdd}
                  control={<Checkbox checked={categories.indexOf(item) > -1 ? true : false} size="small" />}
                />
              ))}
            </FormGroup>
          </FormControl>
          {/* <TextField
            label="New Category"
            size="small"
            value={newCategoryText}
            onChange={(e) => setNewCategoryText(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setCategoryList((prevState) => [
                      ...prevState,
                      newCategoryText.trim(),
                    ]);
                    setNewCategoryText("");
                  }}
                >
                  <Plus />
                </IconButton>
              ),
            }}
          /> */}
        </AddProjectCard>
      </GridItem>
      <GridItem gridArea="footer">
        <AddProjectFooter>
          <Button variant="contained" size="small" onClick={handleSubmit} disabled={isLoading}>
            Submit
          </Button>
        </AddProjectFooter>
        {error && (
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          </div>
        )}
      </GridItem>
    </MainGrid>
  );
}
