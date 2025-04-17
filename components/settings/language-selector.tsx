"use client"

import { useState } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function LanguageSelector() {
  const [language, setLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
  ]

  return (
    <>
      <CardHeader>
        <CardTitle>Language</CardTitle>
        <CardDescription>Select your preferred language for the application</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={language} onValueChange={setLanguage} className="space-y-3">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center space-x-2">
              <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
              <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </>
  )
}
