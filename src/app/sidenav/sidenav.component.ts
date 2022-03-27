import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';


interface listItems {
  labelText: string;
  routerLink: any;
  icon: string;

  children?: listItems[];
}

const TREE_DATA: listItems[] = [
  {
    icon: "dashboard",
    labelText: "Dashboard",
    routerLink: "/dashboard",
    
  },
  {
    icon: "memory",
    labelText: "Hardware",
    routerLink: "",
    children: [
      {
        labelText: "Groups",
        icon: "group",
        routerLink: "",
        children: [
          {
            labelText: "list group",
            icon: "list",
            routerLink: "/listGroup",

          },
          {
            labelText: "add group",
            icon: "playlist_add",
            routerLink: "/addGroup",

          },
        ]

      },
      {
        labelText: "node",
        icon: "developer_board",
        routerLink: "",
        children: [
          {
            labelText: "list nodes",
            icon: "list",
            routerLink: "/listNode",

          },
          {
            labelText: "Node Provisioning",
            icon: "list",
            routerLink: "/provision",
          },
          {
            labelText: "add node",
            icon: "playlist_add",
            routerLink: "/addNode",

          }

        ]

      },
      ,
      {
        labelText: "entity",
        icon: "device_hub",
        routerLink: "",
        children: [
          {
            labelText: "list entity",
            icon: "list",
            routerLink: "/listentity",

          }

        ]

      },
      ,
      {
        labelText: "mqttUser",
        icon: "person",
        routerLink: "",
        children: [
          {
            labelText: "list Mqtt User",
            icon: "list",
            routerLink: "/listmqttuser",

          }

        ]

      }

    ],
  },
  {

    icon: "donut_large",
    labelText: "performance",
    routerLink: "",
    children: [

      {
        labelText: "Logs",
        icon: "insert_drive_file",
        routerLink: "/logs",

      },

    ],
  },
  {

    icon: " lock_icon",
    labelText: "Adminstration",
    routerLink: "",
    children: [
      ,
      {
        labelText: "usergroups",
        icon: "group",
        routerLink: "",
        children: [
          {
            labelText: "list groups",
            icon: "list",
            routerLink: "/listUgroup",

          },
          {
            labelText: "add group",
            icon: "playlist_add",
            routerLink: "/addUgroup",

          }
        ]

      },
      {
        labelText: "User Accounts",
        icon: "person",
        routerLink: "/usersManagement",

      }

    ],
  },
  {

    icon: " account_circle_icon",
    labelText: "Profile",
    routerLink: "",
    children: [

      {
        labelText: "Settings",
        icon: "settings_icon",
        routerLink: "/userProfile",

      },

    ],

  }


];
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  labelText: string;
  level: number;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private _transformer = (node: listItems, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      labelText: node.labelText,
      icon: node.icon,
      routerLink: node.routerLink,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  // nav functions
  expandAll() {
    this.treeControl.expandAll()
  }
  collapseAll() {
    this.treeControl.collapseAll()
  }
  ngOnInit(): void {
  }

}
