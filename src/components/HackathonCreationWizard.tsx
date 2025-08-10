'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Users,
  Settings,
  Mail,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Copy,
  Link,
  FileText,
  Upload
} from 'lucide-react';

// Hackathon schema for form validation
const hackathonSchema = z.object({
  name: z.string().min(1, 'Hackathon name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  theme: z.string().min(1, 'Theme is required'),
  format: z.enum(['virtual', 'in-person', 'hybrid']),
  maxParticipants: z.number().min(1, 'Must allow at least 1 participant'),
  announcementDate: z.string(),
  registrationOpen: z.string(),
  registrationClose: z.string(),
  eventStartDate: z.string(),
  eventEndDate: z.string(),
  phases: z.object({
    prep: z.object({
      start: z.string(),
      end: z.string(),
    }),
    submission: z.object({
      start: z.string(),
      end: z.string(),
    }),
    judging: z.object({
      start: z.string(),
      end: z.string(),
    }),
  }),
  prizes: z.array(z.object({
    place: z.string(),
    amount: z.string(),
    description: z.string(),
  })),
  judges: z.array(z.object({
    name: z.string(),
    title: z.string(),
    company: z.string(),
  })),
  customFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(['text', 'textarea', 'select', 'checkbox', 'file']),
    required: z.boolean(),
    options: z.array(z.string()).optional(),
    conditionalLogic: z.object({
      dependsOn: z.string().optional(),
      showWhen: z.string().optional(),
    }).optional(),
  })),
});

type HackathonFormData = z.infer<typeof hackathonSchema>;

interface HackathonCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: HackathonFormData) => void;
}

const WIZARD_STEPS = [
  { id: 'basic', title: 'Basic Info', icon: FileText },
  { id: 'timeline', title: 'Timeline', icon: Calendar },
  { id: 'participants', title: 'Participants', icon: Users },
  { id: 'form-builder', title: 'Application Form', icon: Settings },
  { id: 'review', title: 'Review & Create', icon: Check },
];

export default function HackathonCreationWizard({
  isOpen,
  onClose,
  onSubmit
}: HackathonCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [customFields, setCustomFields] = useState<any[]>([]);

  const form = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      format: 'virtual',
      maxParticipants: 100,
      prizes: [
        { place: '1st Place', amount: '$5,000', description: 'Winner takes all' },
        { place: '2nd Place', amount: '$2,000', description: 'Runner up' },
        { place: '3rd Place', amount: '$1,000', description: 'Third place' },
      ],
      judges: [],
      customFields: [],
      phases: {
        prep: { start: '', end: '' },
        submission: { start: '', end: '' },
        judging: { start: '', end: '' },
      },
    },
  });

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateTinyUrl = (hackathonName: string) => {
    const shortId = nanoid(8);
    const cleanName = hackathonName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `https://hackflow.io/${cleanName}-${shortId}`;
  };

  const handleFormSubmit = (data: HackathonFormData) => {
    const url = generateTinyUrl(data.name);
    setGeneratedUrl(url);
    onSubmit({ ...data, customFields });
  };

  const addCustomField = () => {
    const newField = {
      id: nanoid(),
      label: '',
      type: 'text' as const,
      required: false,
      options: [],
      conditionalLogic: {},
    };
    setCustomFields([...customFields, newField]);
  };

  const updateCustomField = (index: number, updates: any) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], ...updates };
    setCustomFields(updated);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Create New Hackathon</DialogTitle>
          <DialogDescription className="text-slate-400">
            Set up your hackathon with our guided wizard
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Step {currentStep + 1} of {WIZARD_STEPS.length}
            </span>
            <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {WIZARD_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                      ${isActive ? 'bg-purple-600 border-purple-600 text-white' :
                        isCompleted ? 'bg-green-600 border-green-600 text-white' :
                        'border-slate-600 text-slate-400'}
                    `}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Step Content */}
          {currentStep === 0 && <BasicInfoStep form={form} />}
          {currentStep === 1 && <TimelineStep form={form} />}
          {currentStep === 2 && <ParticipantsStep form={form} />}
          {currentStep === 3 && (
            <FormBuilderStep
              customFields={customFields}
              onAddField={addCustomField}
              onUpdateField={updateCustomField}
              onRemoveField={removeCustomField}
            />
          )}
          {currentStep === 4 && (
            <ReviewStep
              form={form}
              customFields={customFields}
              generatedUrl={generatedUrl}
              onGenerateUrl={() => setGeneratedUrl(generateTinyUrl(form.getValues('name')))}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="text-slate-300 border-slate-600"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep === WIZARD_STEPS.length - 1 ? (
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Create Hackathon
                <Check className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BasicInfoStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Basic Information</CardTitle>
          <CardDescription className="text-slate-400">
            Tell us about your hackathon
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Hackathon Name</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="AI Innovation Challenge 2024"
              className="bg-slate-700 border-slate-600 text-white"
            />
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">Description</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Describe your hackathon, its goals, and what participants can expect..."
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />
            {form.formState.errors.description && (
              <p className="text-red-400 text-sm">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-slate-300">Theme</Label>
              <Input
                id="theme"
                {...form.register('theme')}
                placeholder="Artificial Intelligence"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Format</Label>
              <Select onValueChange={(value) => form.setValue('format', value as any)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimelineStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Timeline Configuration</CardTitle>
          <CardDescription className="text-slate-400">
            Set up your hackathon timeline and phases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              All dates will be used for automated email campaigns and participant notifications
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Announcement Date</Label>
              <Input
                type="datetime-local"
                {...form.register('announcementDate')}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Registration Opens</Label>
              <Input
                type="datetime-local"
                {...form.register('registrationOpen')}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Registration Closes</Label>
              <Input
                type="datetime-local"
                {...form.register('registrationClose')}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Event Start Date</Label>
              <Input
                type="datetime-local"
                {...form.register('eventStartDate')}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Event Phases */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Event Phases</h4>

            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Preparation Phase</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 text-sm">Start</Label>
                    <Input
                      type="datetime-local"
                      {...form.register('phases.prep.start')}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 text-sm">End</Label>
                    <Input
                      type="datetime-local"
                      {...form.register('phases.prep.end')}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Submission Phase</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 text-sm">Start</Label>
                    <Input
                      type="datetime-local"
                      {...form.register('phases.submission.start')}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 text-sm">End</Label>
                    <Input
                      type="datetime-local"
                      {...form.register('phases.submission.end')}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Judging Phase</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 text-sm">Start</Label>
                    <Input
                      type="datetime-local"
                      {...form.register('phases.judging.start')}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 text-sm">End</Label>
                    <Input
                      type="datetime-local"
                      {...form.register('phases.judging.end')}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ParticipantsStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Participant Settings</CardTitle>
          <CardDescription className="text-slate-400">
            Configure participant limits and prizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Maximum Participants</Label>
            <Input
              type="number"
              {...form.register('maxParticipants', { valueAsNumber: true })}
              placeholder="100"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Prize Structure</h4>
            <div className="space-y-3">
              {form.watch('prizes')?.map((prize: any, index: number) => (
                <Card key={index} className="bg-slate-700 border-slate-600">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm">Place</Label>
                        <Input
                          {...form.register(`prizes.${index}.place`)}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm">Amount</Label>
                        <Input
                          {...form.register(`prizes.${index}.amount`)}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm">Description</Label>
                        <Input
                          {...form.register(`prizes.${index}.description`)}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormBuilderStep({
  customFields,
  onAddField,
  onUpdateField,
  onRemoveField
}: {
  customFields: any[];
  onAddField: () => void;
  onUpdateField: (index: number, updates: any) => void;
  onRemoveField: (index: number) => void;
}) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Application Form Builder</CardTitle>
          <CardDescription className="text-slate-400">
            Create custom fields for your registration form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Custom Fields</h4>
            <Button onClick={onAddField} variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>

          <div className="space-y-4">
            {customFields.map((field, index) => (
              <Card key={field.id} className="bg-slate-700 border-slate-600">
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="space-y-2">
                          <Label className="text-slate-300 text-sm">Field Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => onUpdateField(index, { label: e.target.value })}
                            placeholder="e.g. Programming Experience"
                            className="bg-slate-600 border-slate-500 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300 text-sm">Field Type</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value) => onUpdateField(index, { type: value })}
                          >
                            <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="text">Text Input</SelectItem>
                              <SelectItem value="textarea">Text Area</SelectItem>
                              <SelectItem value="select">Dropdown</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                              <SelectItem value="file">File Upload</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        onClick={() => onRemoveField(index)}
                        variant="outline"
                        size="sm"
                        className="ml-4 text-red-400 border-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {field.type === 'select' && (
                      <div className="space-y-2">
                        <Label className="text-slate-300 text-sm">Options (one per line)</Label>
                        <Textarea
                          value={field.options?.join('\n') || ''}
                          onChange={(e) => onUpdateField(index, {
                            options: e.target.value.split('\n').filter(option => option.trim())
                          })}
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => onUpdateField(index, { required: e.target.checked })}
                          className="rounded bg-slate-600 border-slate-500"
                        />
                        <span className="text-slate-300 text-sm">Required field</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {customFields.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <FileText className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                <p className="mb-4">No custom fields yet</p>
                <Button onClick={onAddField} variant="outline" className="text-slate-300 border-slate-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Field
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReviewStep({
  form,
  customFields,
  generatedUrl,
  onGenerateUrl
}: {
  form: any;
  customFields: any[];
  generatedUrl: string;
  onGenerateUrl: () => void;
}) {
  const values = form.getValues();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Review & Create</CardTitle>
          <CardDescription className="text-slate-400">
            Review your hackathon details before creating
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generated URL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Registration URL</h4>
              <Button onClick={onGenerateUrl} variant="outline" size="sm" className="text-slate-300 border-slate-600">
                <Link className="h-4 w-4 mr-2" />
                Generate URL
              </Button>
            </div>
            {generatedUrl && (
              <div className="flex items-center space-x-2 p-3 bg-slate-700 rounded-lg">
                <code className="flex-1 text-green-400 text-sm">{generatedUrl}</code>
                <Button
                  onClick={() => copyToClipboard(generatedUrl)}
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-slate-600"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Basic Info Summary */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Name:</span>
                <span className="text-white ml-2">{values.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Format:</span>
                <span className="text-white ml-2 capitalize">{values.format}</span>
              </div>
              <div>
                <span className="text-slate-400">Theme:</span>
                <span className="text-white ml-2">{values.theme}</span>
              </div>
              <div>
                <span className="text-slate-400">Max Participants:</span>
                <span className="text-white ml-2">{values.maxParticipants}</span>
              </div>
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Timeline</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Registration Opens:</span>
                <span className="text-white">{values.registrationOpen ? format(new Date(values.registrationOpen), 'PPP p') : 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Registration Closes:</span>
                <span className="text-white">{values.registrationClose ? format(new Date(values.registrationClose), 'PPP p') : 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Event Starts:</span>
                <span className="text-white">{values.eventStartDate ? format(new Date(values.eventStartDate), 'PPP p') : 'Not set'}</span>
              </div>
            </div>
          </div>

          {/* Custom Fields Summary */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Custom Fields ({customFields.length})</h4>
            {customFields.length > 0 ? (
              <div className="space-y-2">
                {customFields.map((field, index) => (
                  <div key={field.id} className="flex items-center justify-between p-2 bg-slate-700 rounded">
                    <span className="text-white text-sm">{field.label}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                        {field.type}
                      </Badge>
                      {field.required && (
                        <Badge variant="secondary" className="bg-red-500/20 text-red-300">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No custom fields added</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
