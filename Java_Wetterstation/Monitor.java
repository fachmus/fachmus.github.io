public class Monitor implements Observer {
    JTextField field;
    private int temperatur;
    private int minTemperatur;
    private int maxTemperatur;
    private int luftfeuchtigkeit;
    String Place;
    public Monitor(String Place) {
        this.Place = Place;
        JFrame frame = new JFrame();
        field = new JTextField();
    } 
    public void receiveData(String dataType, String dataValue) {
        switch (dataType) {
            case "temperatur" :
                String.toInt(dataValue);
                break;
            case "maxTemperatur" :
                String.toInt(dataValue);
                break;
            case "minTemperatur" :
                String.toInt(dataValue);
                break;
            case "luftfeuchtigkeit" :
                String.toInt(dataValue);
                break;

        }
    }
}