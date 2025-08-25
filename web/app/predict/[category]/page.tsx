"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Heart, Activity, Brain, Stethoscope, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"

const predictionConfig = {
  "heart-disease": {
    title: "Heart Disease Prediction",
    description: "Assess your cardiovascular risk based on key health indicators",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    fields: [
      { name: "age", label: "Age", type: "number", min: 18, max: 100 },
      { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
      {
        name: "chestPain",
        label: "Chest Pain Type",
        type: "select",
        options: ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"],
      },
      { name: "restingBP", label: "Resting Blood Pressure (mmHg)", type: "number", min: 80, max: 200 },
      { name: "cholesterol", label: "Cholesterol Level (mg/dl)", type: "number", min: 100, max: 400 },
      { name: "fastingBS", label: "Fasting Blood Sugar > 120 mg/dl", type: "select", options: ["Yes", "No"] },
      { name: "maxHR", label: "Maximum Heart Rate", type: "slider", min: 60, max: 220 },
      { name: "exerciseAngina", label: "Exercise Induced Angina", type: "select", options: ["Yes", "No"] },
    ],
  },
  diabetes: {
    title: "Diabetes Risk Assessment",
    description: "Evaluate your diabetes risk using health and lifestyle factors",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    fields: [
      { name: "pregnancies", label: "Number of Pregnancies", type: "number", min: 0, max: 20 },
      { name: "glucose", label: "Glucose Level (mg/dl)", type: "number", min: 50, max: 300 },
      { name: "bloodPressure", label: "Blood Pressure (mmHg)", type: "number", min: 40, max: 180 },
      { name: "skinThickness", label: "Skin Thickness (mm)", type: "number", min: 0, max: 100 },
      { name: "insulin", label: "Insulin Level (mu U/ml)", type: "number", min: 0, max: 900 },
      { name: "bmi", label: "Body Mass Index", type: "slider", min: 15, max: 50 },
      { name: "diabetesPedigree", label: "Diabetes Pedigree Function", type: "slider", min: 0, max: 2, step: 0.1 },
      { name: "age", label: "Age", type: "number", min: 18, max: 100 },
    ],
  },
  parkinsons: {
    title: "Parkinson's Disease Assessment",
    description: "Early detection screening for Parkinson's disease symptoms",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    fields: [
      { name: "age", label: "Age", type: "number", min: 18, max: 100 },
      { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
      { name: "tremor", label: "Tremor Severity", type: "slider", min: 0, max: 4 },
      { name: "rigidity", label: "Muscle Rigidity", type: "slider", min: 0, max: 4 },
      { name: "bradykinesia", label: "Slowness of Movement", type: "slider", min: 0, max: 4 },
      { name: "posturalInstability", label: "Postural Instability", type: "slider", min: 0, max: 4 },
      {
        name: "speechChanges",
        label: "Speech Changes",
        type: "select",
        options: ["None", "Mild", "Moderate", "Severe"],
      },
      {
        name: "handwriting",
        label: "Handwriting Changes",
        type: "select",
        options: ["None", "Mild", "Moderate", "Severe"],
      },
    ],
  },
  "common-diseases": {
    title: "Common Diseases Screening",
    description: "General health assessment for various medical conditions",
    icon: Stethoscope,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    fields: [
      { name: "age", label: "Age", type: "number", min: 18, max: 100 },
      { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
      {
        name: "symptoms",
        label: "Primary Symptoms",
        type: "select",
        options: ["Fever", "Cough", "Fatigue", "Headache", "Nausea", "Joint Pain"],
      },
      { name: "duration", label: "Symptom Duration (days)", type: "number", min: 1, max: 365 },
      { name: "severity", label: "Symptom Severity", type: "slider", min: 1, max: 10 },
      { name: "temperature", label: "Body Temperature (°F)", type: "number", min: 95, max: 110, step: 0.1 },
      {
        name: "chronicConditions",
        label: "Chronic Conditions",
        type: "select",
        options: ["None", "Hypertension", "Diabetes", "Asthma", "Heart Disease"],
      },
      {
        name: "medications",
        label: "Current Medications",
        type: "select",
        options: ["None", "Pain Relievers", "Antibiotics", "Blood Pressure", "Other"],
      },
    ],
  },
}

export default function PredictionPage() {
  const params = useParams()
  const category = params.category as string
  const config = predictionConfig[category as keyof typeof predictionConfig]

  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ risk: number; recommendations: string[] } | null>(null)

  if (!config) {
    return <div>Category not found</div>
  }

  const IconComponent = config.icon

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate AI prediction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock prediction result
    const mockRisk = Math.floor(Math.random() * 100)
    const mockRecommendations = [
      "Maintain a healthy diet rich in fruits and vegetables",
      "Exercise regularly for at least 30 minutes daily",
      "Schedule regular check-ups with your healthcare provider",
      "Monitor your symptoms and keep a health diary",
    ]

    setResult({ risk: mockRisk, recommendations: mockRecommendations })
    setIsLoading(false)
  }

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { level: "Low", color: "bg-green-500", textColor: "text-green-500" }
    if (risk < 70) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-500" }
    return { level: "High", color: "bg-red-500", textColor: "text-red-500" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass border-border/50 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${config.color}`} />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-2xl">{config.title}</CardTitle>
                    <CardDescription className="text-base">{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {config.fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-sm font-medium">
                          {field.label}
                        </Label>

                        {field.type === "number" && (
                          <Input
                            id={field.name}
                            type="number"
                            min={field.min}
                            max={field.max}
                            step={field.step || 1}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="glass border-border/50 focus:border-primary/50 transition-all duration-300"
                            required
                          />
                        )}

                        {field.type === "select" && (
                          <Select
                            value={formData[field.name] || ""}
                            onValueChange={(value) => handleInputChange(field.name, value)}
                          >
                            <SelectTrigger className="glass border-border/50 focus:border-primary/50 transition-all duration-300">
                              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {field.type === "slider" && (
                          <div className="space-y-2">
                            <Slider
                              value={[formData[field.name] || field.min]}
                              onValueChange={(value) => handleInputChange(field.name, value[0])}
                              max={field.max}
                              min={field.min}
                              step={field.step || 1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{field.min}</span>
                              <span className="font-medium">{formData[field.name] || field.min}</span>
                              <span>{field.max}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Get Prediction"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="glass border-border/50 shadow-2xl sticky top-8">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Prediction Result</CardTitle>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Complete the form to get your prediction</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-muted/20"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.risk / 100)}`}
                            className={getRiskLevel(result.risk).textColor}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{result.risk}%</span>
                        </div>
                      </div>
                      <Badge className={`${getRiskLevel(result.risk).color} text-white`}>
                        {getRiskLevel(result.risk).level} Risk
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        This prediction is for informational purposes only. Please consult with a healthcare
                        professional for proper medical advice.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <div className="text-center">
                        <h4 className="font-semibold mb-2 text-sm">Want to Learn More?</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                          Get detailed information about your condition, symptoms, and treatment options.
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full glass border-primary/30 hover:bg-primary/10 transition-all duration-300 bg-transparent"
                        >
                          <a
                            href="https://health-predictor-wiki.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            <IconComponent className="h-4 w-4 mr-2" />
                            Know Your Disease
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
