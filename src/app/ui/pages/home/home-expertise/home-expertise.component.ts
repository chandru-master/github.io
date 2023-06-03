import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mTools = [

    // design
    {
      "id": "5131",
      "name": "Figma",
      "logo": "assets/img/tools/figma.svg",
      "link": "https://www.figma.com/",
      "tab": "design"
    },
    {
      "id": "5132",
      "name": "Flask",
      "logo": "assets/img/tools/flask.png",
      "link": "https://flask.palletsprojects.com/",
      "tab": "design"
    },
    {
      "id": "5133",
      "name": "Django",
      "logo": "assets/img/tools/django.png",
      "link": "https://www.djangoproject.com/",
      "tab": "design"
    },

    // android

    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },
    {
      "id": "8102",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end"
    },
    //No sql
    {
      "id": "7126",
      "name": "MongoDB",
      "logo": "assets/img/tools/mongo.png",
      "link": "https://www.mongodb.com/",
      "tab": "back-end"
    },
    {
      "id": "7127",
      "name": "Cosmos",
      "logo": "assets/img/tools/cosmos.png",
      "link": "https://azure.microsoft.com/en-in/free/cosmos-db/",
      "tab": "back-end"
    },
    {
      "id": "7128",
      "name": "couchBase",
      "logo": "assets/img/tools/couchbase.png",
      "link": "https://www.couchbase.com/",
      "tab": "back-end"
    },
    {
      "id": "7129",
      "name": "DynamodB",
      "logo": "assets/img/tools/dynamodb.png",
      "link": "https://aws.amazon.com/pm/dynamodb/",
      "tab": "back-end"
    },
    //back end tool
    {
      "id": "7130",
      "name": "VS code",
      "logo": "assets/img/tools/vscode.png",
      "link": "https://code.visualstudio.com/",
      "tab": "back-end"
    },
    {
      "id": "7131",
      "name": "PyCharm",
      "logo": "assets/img/tools/pycharm.jpg",
      "link": "https://www.jetbrains.com/pycharm/",
      "tab": "back-end"
    },
    {
      "id": "7132",
      "name": "Anaconda",
      "logo": "assets/img/tools/anaconda.png",
      "link": "https://www.anaconda.com/",
      "tab": "back-end"
    },
    {
      "id": "7133",
      "name": "Docker",
      "logo": "assets/img/tools/docker.png",
      "link": "https://www.docker.com/",
      "tab": "back-end"
    },
    {
      "id": "7134",
      "name": "BitBucket",
      "logo": "assets/img/tools/bitbucket.png",
      "link": "https://bitbucket.org/",
      "tab": "back-end"
    },
    {
      "id": "7135",
      "name": "Git Bash",
      "logo": "assets/img/tools/gitbast.png",
      "link": "https://git-scm.com/",
      "tab": "back-end"
    },
    {
      "id": "7136",
      "name": "R Language",
      "logo": "assets/img/tools/r.png",
      "link": "https://www.r-project.org/",
      "tab": "back-end"
    },
    {
      "id": "7137",
      "name": "Jira",
      "logo": "assets/img/tools/jira.png",
      "link": "https://www.atlassian.com/software/jira",
      "tab": "back-end"
    },
    {
      "id": "7138",
      "name": "Kafka",
      "logo": "assets/img/tools/kafka.png",
      "link": "https://kafka.apache.org/",
      "tab": "back-end"
    },
    {
      "id": "7139",
      "name": "Zoopkeeper",
      "logo": "assets/img/tools/zookeeper.png",
      "link": "https://zookeeper.apache.org/",
      "tab": "back-end"
    },
    {
      "id": "7140",
      "name": "Streamlit",
      "logo": "assets/img/tools/streamlit.png",
      "link": "https://streamlit.io/",
      "tab": "back-end"
    },
    {
      "id": "7141",
      "name": "Postman",
      "logo": "assets/img/tools/postman.png",
      "link": "https://www.postman.com/",
      "tab": "back-end"
    },
    {
      "id": "7142",
      "name": "PySpark",
      "logo": "assets/img/tools/spark.png",
      "link": "https://spark.apache.org/",
      "tab": "back-end"
    },
    {
      "id": "7143",
      "name": "Java",
      "logo": "assets/img/tools/java-logo.png",
      "link": "https://www.java.com/en/",
      "tab": "back-end"
    },
    {
      "id": "7144",
      "name": "JS",
      "logo": "assets/img/tools/javascript.png",
      "link": "https://www.javascript.com/",
      "tab": "back-end"
    },
    {
      "id": "7145",
      "name": "PyTorch",
      "logo": "assets/img/tools/pytorch.png",
      "link": "https://pytorch.org/",
      "tab": "back-end"
    },
    {
      "id": "7146",
      "name": "Tensor Flow",
      "logo": "assets/img/tools/tf.png",
      "link": "https://www.tensorflow.org/",
      "tab": "back-end"
    },
    {
      "id": "7147",
      "name": "Keras",
      "logo": "assets/img/tools/keras.png",
      "link": "https://keras.io/",
      "tab": "back-end"
    },
    {
      "id": "7148",
      "name": "Lamda",
      "logo": "assets/img/tools/aws lamda.png",
      "link": "https://aws.amazon.com/lambda/",
      "tab": "back-end"
    },
    {
      "id": "7149",
      "name": "Cloudera",
      "logo": "assets/img/tools/cloudera.png",
      "link": "https://www.cloudera.com/",
      "tab": "back-end"
    },
    {
      "id": "7150",
      "name": "Jenkins",
      "logo": "assets/img/tools/jenkins.png",
      "link": "https://www.jenkins.io/",
      "tab": "back-end"
    },
    {
      "id": "7151",
      "name": "Pandas",
      "logo": "assets/img/tools/pandas.png",
      "link": "https://pandas.pydata.org/",
      "tab": "back-end"
    },
    {
      "id": "7152",
      "name": "Numpy",
      "logo": "assets/img/tools/numpy.png",
      "link": "https://numpy.org/",
      "tab": "back-end"
    },
    {
      "id": "7153",
      "name": "sklearn",
      "logo": "assets/img/tools/sklearn.png",
      "link": "https://scikit-learn.org/stable/",
      "tab": "back-end"
    },
    {
      "id": "7154",
      "name": "Power BI",
      "logo": "assets/img/tools/power bi.png",
      "link": "https://powerbi.microsoft.com/en-gb/",
      "tab": "back-end"
    },
    {
      "id": "7155",
      "name": "My SQL",
      "logo": "assets/img/tools/mysql.png",
      "link": "https://www.mysql.com/",
      "tab": "back-end"
    },
    {
      "id": "7156",
      "name": "Lucid chart",
      "logo": "assets/img/tools/lucid_chart.png",
      "link": "https://www.lucidchart.com/",
      "tab": "back-end"
    },
    {
      "id": "7157",
      "name": "Micro Services",
      "logo": "assets/img/tools/micro services.png",
      "link": "https://aws.amazon.com/microservices/",
      "tab": "back-end"
    },


    // cloud

    {
      "id": "6121",
      "name": "Firebase",
      "logo": "assets/img/tools/firebase.svg",
      "link": "https://firebase.google.com/",
      "tab": "cloud"
    },

    {
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud"
    },

    {
      "id": "6124",
      "name": "Google cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "cloud"
    },
    {
      "id": "6125",
      "name": "AWS",
      "logo": "assets/img/tools/aws.png",
      "link": "https://aws.amazon.com/",
      "tab": "cloud"
    },


  ]

}
