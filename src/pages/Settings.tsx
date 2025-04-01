
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Reminder } from "@/utils/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Define form schema for reminder settings
const reminderSchema = z.object({
  rentDueDate: z.string().min(1, "Due date reminder is required"),
  rentLatePenalty: z.boolean(),
  waterBillReminder: z.boolean(),
  penaltyAmount: z.string().optional(),
  penaltyPercentage: z.string().optional(),
  penaltyType: z.enum(["fixed", "percentage"]),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

// Fetch reminders from Supabase
const fetchReminders = async () => {
  const { data, error } = await supabase
    .from("reminders")
    .select("*");
  
  if (error) throw error;
  return data as Reminder[];
};

// Update reminder in Supabase
const updateReminder = async (reminder: Partial<Reminder>) => {
  const { data, error } = await supabase
    .from("reminders")
    .update(reminder)
    .eq("id", reminder.id)
    .select();
  
  if (error) throw error;
  return data;
};

// Create new reminder in Supabase
const createReminder = async (reminder: Omit<Reminder, "id" | "createdAt" | "updatedAt">) => {
  const { data, error } = await supabase
    .from("reminders")
    .insert([reminder])
    .select();
  
  if (error) throw error;
  return data;
};

const Settings = () => {
  const { toast } = useToast();
  const { userRole } = useAuth();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch reminders
  const { data: reminders, isLoading } = useQuery({
    queryKey: ["reminders"],
    queryFn: fetchReminders,
  });
  
  // Find default values from reminders
  const rentReminder = reminders?.find(r => r.type === "rent_due");
  const waterReminder = reminders?.find(r => r.type === "water_bill");
  const penaltyReminder = reminders?.find(r => r.type === "rent_late");
  
  const defaultPenaltyType = penaltyReminder?.message_template?.includes("%") 
    ? "percentage" 
    : "fixed";
  
  // Configure form
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      rentDueDate: rentReminder?.day_of_month?.toString() || "1",
      rentLatePenalty: penaltyReminder?.active || false,
      waterBillReminder: waterReminder?.active || false,
      penaltyAmount: "10",
      penaltyPercentage: "5",
      penaltyType: defaultPenaltyType || "fixed",
    },
  });
  
  // Mutation for updating reminders
  const updateReminderMutation = useMutation({
    mutationFn: updateReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
  
  // Mutation for creating reminders
  const createReminderMutation = useMutation({
    mutationFn: createReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  const onSubmit = async (values: ReminderFormValues) => {
    setIsSaving(true);
    
    try {
      // Update rent due reminder
      if (rentReminder) {
        await updateReminderMutation.mutateAsync({
          id: rentReminder.id,
          day_of_month: parseInt(values.rentDueDate),
          active: true,
        });
      } else {
        await createReminderMutation.mutateAsync({
          type: "rent_due",
          day_of_month: parseInt(values.rentDueDate),
          message_template: "Your rent is due on day ${day_of_month} of this month.",
          active: true,
        });
      }
      
      // Update water bill reminder
      if (waterReminder) {
        await updateReminderMutation.mutateAsync({
          id: waterReminder.id,
          active: values.waterBillReminder,
        });
      } else {
        await createReminderMutation.mutateAsync({
          type: "water_bill",
          day_of_month: 5,
          message_template: "Your water bill is due.",
          active: values.waterBillReminder,
        });
      }
      
      // Update penalty reminder
      const penaltyMessage = values.penaltyType === "percentage"
        ? `Late payment attracts a ${values.penaltyPercentage}% penalty.`
        : `Late payment attracts a ${values.penaltyAmount} KES penalty.`;
      
      if (penaltyReminder) {
        await updateReminderMutation.mutateAsync({
          id: penaltyReminder.id,
          active: values.rentLatePenalty,
          message_template: penaltyMessage,
        });
      } else {
        await createReminderMutation.mutateAsync({
          type: "rent_late",
          day_of_month: parseInt(values.rentDueDate) + 5,
          message_template: penaltyMessage,
          active: values.rentLatePenalty,
        });
      }
      
      toast({
        title: "Settings updated",
        description: "Your reminder settings have been saved successfully",
      });
      
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Only show this page for landlords
  if (userRole !== 'landlord' && userRole !== 'admin') {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-lg">You don't have permission to access this page.</p>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-lg">Loading settings...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure system reminders and penalty settings
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Reminder Settings</CardTitle>
                <CardDescription>
                  Configure when reminders should be sent to tenants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="rentDueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rent Due Date</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="1" 
                            max="28" 
                            {...field} 
                            className="w-24" 
                          />
                          <span>of each month</span>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Day of the month when rent is due
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="waterBillReminder"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Water Bill Reminders
                        </FormLabel>
                        <FormDescription>
                          Automatically notify tenants about water bills
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Penalty System</CardTitle>
                <CardDescription>
                  Configure late payment penalties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="rentLatePenalty"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Late Payment Penalties
                        </FormLabel>
                        <FormDescription>
                          Automatically apply penalties for late rent payments
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("rentLatePenalty") && (
                  <div className="space-y-4 border rounded-lg p-4 mt-4">
                    <FormField
                      control={form.control}
                      name="penaltyType"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Penalty Type</FormLabel>
                          <div className="flex gap-4">
                            <Label className="flex items-center gap-2">
                              <input
                                type="radio"
                                value="fixed"
                                checked={field.value === "fixed"}
                                onChange={e => field.onChange(e.target.value)}
                                className="h-4 w-4"
                              />
                              Fixed Amount
                            </Label>
                            <Label className="flex items-center gap-2">
                              <input
                                type="radio"
                                value="percentage"
                                checked={field.value === "percentage"}
                                onChange={e => field.onChange(e.target.value)}
                                className="h-4 w-4"
                              />
                              Percentage
                            </Label>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("penaltyType") === "fixed" ? (
                      <FormField
                        control={form.control}
                        name="penaltyAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fixed Penalty Amount (KES)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="penaltyPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Penalty Percentage (%)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Settings;
