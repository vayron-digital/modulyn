"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react"

const importFormSchema = z.object({
  file: z.any().refine((file) => file?.length === 1, "Please select a file"),
})

type ImportFormValues = z.infer<typeof importFormSchema>

interface ImportMembersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImportMembersDialog({
  open,
  onOpenChange,
}: ImportMembersDialogProps) {
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importFormSchema),
  })

  async function onSubmit(data: ImportFormValues) {
    try {
      setImporting(true)
      setError(null)
      setSuccess(false)

      const file = data.file[0]
      const reader = new FileReader()

      reader.onload = async (e) => {
        try {
          // Simulate progress
          for (let i = 0; i <= 100; i += 10) {
            setProgress(i)
            await new Promise((resolve) => setTimeout(resolve, 200))
          }

          // Here you would normally send the file to your API
          // const response = await fetch("/api/members/import", {
          //   method: "POST",
          //   body: e.target?.result,
          // })

          setSuccess(true)
          setTimeout(() => {
            onOpenChange(false)
            setImporting(false)
            setProgress(0)
            setSuccess(false)
            form.reset()
          }, 1000)
        } catch (error) {
          setError("Failed to import members. Please try again.")
          setImporting(false)
        }
      }

      reader.readAsText(file)
    } catch (error) {
      setError("Failed to read file. Please try again.")
      setImporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Members</DialogTitle>
          <DialogDescription>
            Upload a CSV file containing member information. The file should
            include headers for: First Name, Last Name, Email, Role, and
            Membership Type.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange }, ...field }) => (
                <FormItem>
                  <FormLabel>CSV File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={(e) => onChange(e.target.files)}
                      disabled={importing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {importing && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground text-center">
                  Importing members... {progress}%
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Members imported successfully!
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={importing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={importing}>
                <Upload className="mr-2 h-4 w-4" />
                Import Members
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
