package handlers;

class CovidData {

    private String cityName;
    private String timeOfSurvey;
    private int covidCases;
    private int covidDeaths;

    protected CovidData(String cityName, String timeOfSurvey, int covidCases, int covidDeaths) {
        this.cityName = cityName;
        this.timeOfSurvey = timeOfSurvey;
        this.covidCases = covidCases;
        this.covidDeaths = covidDeaths;
    }
    //        covidDataList.sort((data1, data2) -> data1.getTimeOfSurvey().compareTo(data2.getTimeOfSurvey()));
    public String getCityName() {
        return cityName;
    }

    public String getTimeOfSurvey() {
        return timeOfSurvey;
    }

    public void setTimeOfSurvey(String timeOfSurvey) {
        this.timeOfSurvey = timeOfSurvey;
    }

    public int getCovidCases() {
        return covidCases;
    }

    public void setCovidCases(int covidCases) {
        this.covidCases = covidCases;
    }

    public int getCovidDeaths() {
        return covidDeaths;
    }

    public void setCovidDeaths(int covidDeaths) {
        this.covidDeaths = covidDeaths;
    }
}
