


export class Course{
  /*
  private Integer id;
    private String description;
    private String longDescription;
    private String iconUrl;
    private int lessonsCount;
    private String category;
    private int seqNo;
    private String url;
    private int price;
   */
  public id:number;
  public description:string;
  public longDescription:string;
  public iconUrl:string;
  public lessonsCount:number;
  public category:string;
  public seqNo:string;
  public url:string;
  public price:number;


  constructor(id: number, description: string, longDescription: string, iconUrl: string, lessonsCount: number, category: string, seqNo: string, url: string, price: number) {
    this.id = id;
    this.description = description;
    this.longDescription = longDescription;
    this.iconUrl = iconUrl;
    this.lessonsCount = lessonsCount;
    this.category = category;
    this.seqNo = seqNo;
    this.url = url;
    this.price = price;
  }
}
