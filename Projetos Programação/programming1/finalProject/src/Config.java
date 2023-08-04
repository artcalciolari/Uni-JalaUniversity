public class Config {
    int h,w,generation,s,population;
    String p;
    int[][] design;

    public Config(){

    }
    public Config (int h, int w, int generation, int s, String p){
      this.h = h;
      this.w = w;
      this.generation = generation;
      this.s = s;
      this.p = p;
      this.design = new int[w][h];
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }

    public int getW() {
        return w;
    }

    public void setW(int w) {
        this.w = w;
    }

    public int getGeneration() {
        return generation;
    }

    public void setGeneration(int generation) {
        this.generation = generation;
    }

    public int getS() {
        return s;
    }

    public void setS(int s) {
        this.s = s;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    public String getP() {
        return p;
    }

    public void setP(String p) {
        this.p = p;
    }

    public int[][] getDesign() {
        return design;
    }

    public void setDesign(int[][] design) {
        this.design = design;
    }
}
