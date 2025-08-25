import { Heart, Activity, Brain, Stethoscope, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function Dashboard() {
  const predictionCategories = [
    {
      id: "heart-disease",
      title: "Heart Disease",
      description: "Predict cardiovascular risk factors and heart disease probability",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      id: "diabetes",
      title: "Diabetes",
      description: "Assess diabetes risk based on health indicators and lifestyle",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "parkinsons",
      title: "Parkinson's Disease",
      description: "Early detection of Parkinson's disease symptoms and risk",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: "common-diseases",
      title: "Common Diseases",
      description: "General health screening for various common medical conditions",
      icon: Stethoscope,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-7xl">
        <div className="bg-background/20 backdrop-blur-xl border border-border/30 rounded-2xl px-8 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-lg">
                HEALTH<span className="text-primary">PREDICTOR</span>
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="/subscription">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-primary/10 transition-all duration-300"
                >
                  Pro
                </Button>
              </Link>
              <ThemeToggle />
              <Link href="/auth">
                <Button
                  size="sm"
                  className="bg-primary/90 hover:bg-primary rounded-full transition-all duration-300 hover:scale-105"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Navigate Your Health's Future Constellation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform charts your health data to reveal future wellness patterns and empower your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {predictionCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/predict/${category.id}`}>
                <Card className="glass hover:glass-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group border-border/50">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <CardTitle className="font-serif text-2xl mb-2">{category.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      Start Prediction →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="glass rounded-2xl p-8 border-border/50">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Why Choose HEALTHPREDICTOR?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Advanced AI</h3>
              <p className="text-muted-foreground">
                State-of-the-art machine learning models trained on extensive medical datasets
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Personalized</h3>
              <p className="text-muted-foreground">
                Tailored predictions based on your unique health profile and risk factors
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Clinically Validated</h3>
              <p className="text-muted-foreground">Results backed by clinical research and medical expertise</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="glass border-t border-border/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-lg">
                HEALTH<span className="text-primary">PREDICTOR</span>
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
