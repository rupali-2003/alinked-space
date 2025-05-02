import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Pencil, X, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ProfileEditorProps {
  section: string;
  title: string;
  currentData: any;
  onSave: (data: any) => void;
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "date";
    placeholder?: string;
  }[];
}

export function ProfileEditor({ section, title, currentData, onSave, fields }: ProfileEditorProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm({
    defaultValues: currentData || {}
  });
  
  const handleSubmit = (data: any) => {
    onSave(data);
    setOpen(false);
    toast.success(`${title} updated successfully`);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          {...formField}
                          placeholder={field.placeholder}
                          className="min-h-24"
                        />
                      ) : (
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface EducationOrExperienceEditorProps {
  section: "education" | "experience";
  items: any[];
  onAdd: (item: any) => void;
  onEdit: (index: number, item: any) => void;
  onDelete: (index: number) => void;
}

export function EducationOrExperienceEditor({ 
  section, 
  items, 
  onAdd, 
  onEdit, 
  onDelete 
}: EducationOrExperienceEditorProps) {
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  
  const initialEducationValues = {
    school: "",
    degree: "",
    duration: ""
  };
  
  const initialExperienceValues = {
    role: "",
    company: "",
    duration: "",
    description: ""
  };
  
  const form = useForm({
    defaultValues: section === "education" ? initialEducationValues : initialExperienceValues
  });
  
  const resetForm = () => {
    if (section === "education") {
      form.reset(initialEducationValues);
    } else {
      form.reset(initialExperienceValues);
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
      setEditMode("add");
      setEditIndex(null);
    }
    setOpen(open);
  };
  
  const handleAdd = () => {
    setEditMode("add");
    resetForm();
    setOpen(true);
  };
  
  const handleEdit = (index: number) => {
    setEditMode("edit");
    setEditIndex(index);
    form.reset(items[index]);
    setOpen(true);
  };
  
  const handleSubmit = (data: any) => {
    if (editMode === "add") {
      onAdd(data);
      toast.success(`New ${section} added`);
    } else {
      if (editIndex !== null) {
        onEdit(editIndex, data);
        toast.success(`${section} updated`);
      }
    }
    setOpen(false);
    resetForm();
  };
  
  type EducationFieldName = keyof typeof initialEducationValues;
  type ExperienceFieldName = keyof typeof initialExperienceValues;
  
  const educationFields = [
    { name: "school" as EducationFieldName, label: "School", type: "text" as const, placeholder: "Enter school name" },
    { name: "degree" as EducationFieldName, label: "Degree", type: "text" as const, placeholder: "Enter degree" },
    { name: "duration" as EducationFieldName, label: "Duration", type: "text" as const, placeholder: "e.g. 2018 - 2022" }
  ];
  
  const experienceFields = [
    { name: "role" as ExperienceFieldName, label: "Role", type: "text" as const, placeholder: "Enter role" },
    { name: "company" as ExperienceFieldName, label: "Company", type: "text" as const, placeholder: "Enter company name" },
    { name: "duration" as ExperienceFieldName, label: "Duration", type: "text" as const, placeholder: "e.g. Mar 2022 - Present" },
    { name: "description" as ExperienceFieldName, label: "Description", type: "textarea" as const, placeholder: "Enter job description" }
  ];
  
  const fields = section === "education" ? educationFields : experienceFields;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{section === "education" ? "Education" : "Experience"}</h2>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="flex">
            <div className="mr-4">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                {section === "education" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1">
              {section === "education" ? (
                <>
                  <h3 className="font-medium">{item.school}</h3>
                  <p className="text-gray-700">{item.degree}</p>
                  <p className="text-sm text-gray-500">{item.duration}</p>
                </>
              ) : (
                <>
                  <h3 className="font-medium">{item.role}</h3>
                  <p className="text-gray-700">{item.company}</p>
                  <p className="text-sm text-gray-500">{item.duration}</p>
                  <p className="mt-2">{item.description}</p>
                </>
              )}
            </div>
            <div className="flex flex-col space-y-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8"
                onClick={() => handleEdit(index)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 text-red-500 hover:text-red-700"
                onClick={() => {
                  onDelete(index);
                  toast.success(`${section === "education" ? "Education" : "Experience"} removed`);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode === "add" 
                ? `Add ${section === "education" ? "Education" : "Experience"}` 
                : `Edit ${section === "education" ? "Education" : "Experience"}`}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "textarea" ? (
                          <Textarea
                            {...formField}
                            placeholder={field.placeholder}
                            className="min-h-24"
                          />
                        ) : (
                          <Input
                            {...formField}
                            type={field.type}
                            placeholder={field.placeholder}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editMode === "add" ? "Add" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ProfilePhotoEditor({ currentPhoto, onPhotoChange }: {
  currentPhoto: string;
  onPhotoChange: (photo: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const photoUrl = URL.createObjectURL(file);
    setPreviewPhoto(photoUrl);
  };
  
  const handleSave = () => {
    if (previewPhoto) {
      onPhotoChange(previewPhoto);
      
      const storedProfile = localStorage.getItem('linkedinProfile');
      const profileData = storedProfile ? JSON.parse(storedProfile) : {};
      profileData.photo = previewPhoto;
      localStorage.setItem('linkedinProfile', JSON.stringify(profileData));
      
      toast.success("Profile photo updated");
    }
    setOpen(false);
  };
  
  const handleDelete = () => {
    const defaultPhoto = "/public/placeholder.svg";
    onPhotoChange(defaultPhoto);
    
    const storedProfile = localStorage.getItem('linkedinProfile');
    const profileData = storedProfile ? JSON.parse(storedProfile) : {};
    profileData.photo = defaultPhoto;
    localStorage.setItem('linkedinProfile', JSON.stringify(profileData));
    
    setOpen(false);
    toast.success("Profile photo removed");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="absolute -top-16 left-6 group cursor-pointer">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
            <img 
              src={currentPhoto} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Pencil className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Photo</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
            <img 
              src={previewPhoto || currentPhoto} 
              alt="Profile Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="flex gap-3 mt-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              Choose Photo
            </Button>
            
            <Button
              onClick={handleDelete}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Remove Photo
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!previewPhoto}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SkillsEditor({ skills, onSkillsChange }: { 
  skills: string[]; 
  onSkillsChange: (skills: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [editedSkills, setEditedSkills] = useState<string[]>([]);
  
  const handleOpen = () => {
    setEditedSkills([...skills]);
    setOpen(true);
  };
  
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    setEditedSkills([...editedSkills, newSkill.trim()]);
    setNewSkill("");
  };
  
  const handleRemoveSkill = (index: number) => {
    const updated = [...editedSkills];
    updated.splice(index, 1);
    setEditedSkills(updated);
  };
  
  const handleSave = () => {
    onSkillsChange(editedSkills);
    setOpen(false);
    toast.success("Skills updated");
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handleOpen}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-medium">{skill}</h3>
          </div>
        ))}
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Skills</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button onClick={handleAddSkill}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {editedSkills.map((skill, index) => (
                <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1">
                  <span>{skill}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full hover:bg-gray-200"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
