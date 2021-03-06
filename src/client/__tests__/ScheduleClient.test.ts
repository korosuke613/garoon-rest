import { MockClient } from "../../http/MockClient";
import { ScheduleClient } from "../ScheduleClient";
import { GaroonRequestConfigBuilder } from "../../GaroonRequestConfigBuilder";
import { errorResponseHandler } from "../../GaroonRestAPIClient";

describe("ScheduleClient", () => {
  let mockClient: MockClient;
  let scheduleClient: ScheduleClient;

  beforeEach(() => {
    const requestConfigBuilder = new GaroonRequestConfigBuilder({
      baseUrl: "https://example.cybozu.com/g",
      auth: {
        type: "password",
        username: "cybozu",
        password: "cybozu",
      },
    });
    mockClient = new MockClient({ requestConfigBuilder, errorResponseHandler });
    scheduleClient = new ScheduleClient(mockClient);
  });

  describe("getEvent", () => {
    beforeEach(async () => {
      await scheduleClient.getEvent({ id: 1 });
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/events/1");
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass an empty object as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({});
    });
  });

  describe("getEvents", () => {
    describe("without parameter", () => {
      beforeEach(async () => {
        await scheduleClient.getEvents();
      });
      it("should pass the path to the http client", () => {
        expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/events");
      });
      it("should send a get request", () => {
        expect(mockClient.getLogs()[0].method).toBe("get");
      });
      it("should pass an empty object as a param to the http client", () => {
        expect(mockClient.getLogs()[0].params).toEqual({});
      });
    });
    describe("with parameter", () => {
      beforeEach(async () => {
        await scheduleClient.getEvents({
          limit: 100,
          offset: 0,
          fields: ["id", "creator"],
          orderBy: {
            property: "createdAt",
            order: "asc",
          },
          rangeStart: "2017-10-19T00:10:30Z",
          rangeEnd: "2017-10-19T01:10:30Z",
          target: 1,
          targetType: "user",
          keyword: "test",
          excludeFromSearch: ["subject", "company"],
        });
      });
      it("should pass the path to the http client", () => {
        expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/events");
      });
      it("should send a get request", () => {
        expect(mockClient.getLogs()[0].method).toBe("get");
      });
      it("should pass limit, offset, fields, orderBy, rangeStart, rangeEnd, target, targetType, keyword and excludeFromSearch as a param to the http client", () => {
        expect(mockClient.getLogs()[0].params).toEqual({
          limit: 100,
          offset: 0,
          fields: "id,creator",
          orderBy: "createdAt asc",
          rangeStart: "2017-10-19T00:10:30Z",
          rangeEnd: "2017-10-19T01:10:30Z",
          target: 1,
          targetType: "user",
          keyword: "test",
          excludeFromSearch: "subject,company",
        });
      });
    });
  });

  describe("addEvent", () => {
    const params = {
      eventType: "REGULAR" as const,
      eventMenu: "MTG",
      subject: "Weekly conference",
      notes: "This is notes.",
      start: {
        dateTime: "2020-07-01T14:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2020-07-01T15:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      isAllDay: false,
      isStartOnly: false,
      attendees: [
        {
          type: "USER" as const,
          id: 1,
        },
      ],
      facilities: [
        {
          id: 1,
        },
      ],
      facilityUsingPurpose: "Because of the explanation of a new plan",
      companyInfo: {
        name: "Cybozu, Inc.",
        zipCode: "103-xxxx",
        address: "2-7-1, Nihombashi, Chuo-ku, Tokyo",
        route: "Nihombashi Sta. - Ginza Line - Shibuya Sta.",
        routeTime: "18",
        routeFare: "195",
        phone: "03-4306-xxxx",
      },
      attachments: [
        {
          name: "text.txt",
          content: "dGVzdA==",
        },
      ],
      visibilityType: "PUBLIC" as const,
      useAttendanceCheck: false,
      watchers: [
        {
          type: "USER" as const,
          id: 2,
        },
      ],
      additionalItems: {
        item: {
          value: "hoge",
        },
      },
    };
    beforeEach(async () => {
      await scheduleClient.addEvent(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/events");
    });
    it("should send a post request", () => {
      expect(mockClient.getLogs()[0].method).toBe("post");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });

  describe("updateEvent", () => {
    const params = {
      id: "1",
      event: {
        eventMenu: "MTG",
        subject: "Weekly conference",
        notes: "This is notes.",
        start: {
          dateTime: "2020-07-01T14:00:00+09:00",
          timeZone: "Asia/Tokyo",
        },
        end: {
          dateTime: "2020-07-01T15:00:00+09:00",
          timeZone: "Asia/Tokyo",
        },
        isAllDay: false,
        isStartOnly: false,
        attendees: [
          {
            type: "USER" as const,
            id: 1,
          },
        ],
        facilities: [
          {
            id: 1,
          },
        ],
        facilityUsingPurpose: "Because of the explanation of a new plan",
        companyInfo: {
          name: "Cybozu, Inc.",
          zipCode: "103-xxxx",
          address: "2-7-1, Nihombashi, Chuo-ku, Tokyo",
          route: "Nihombashi Sta. - Ginza Line - Shibuya Sta.",
          routeTime: "18",
          routeFare: "195",
          phone: "03-4306-xxxx",
        },
        visibilityType: "PUBLIC" as const,
        useAttendanceCheck: false,
        watchers: [
          {
            type: "USER" as const,
            id: 2,
          },
        ],
        additionalItems: {
          item: {
            value: "hoge",
          },
        },
      },
    };
    beforeEach(async () => {
      await scheduleClient.updateEvent(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/events/1");
    });
    it("should send a patch request", () => {
      expect(mockClient.getLogs()[0].method).toBe("patch");
    });
    it("should pass params.event as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params.event);
    });
  });

  describe("deleteEvent", () => {
    const params = {
      id: "1",
    };
    beforeEach(async () => {
      await scheduleClient.deleteEvent(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/events/1");
    });
    it("should send a delete request", () => {
      expect(mockClient.getLogs()[0].method).toBe("delete");
    });
    it("should pass an empty object as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({});
    });
  });

  describe("searchAvailableTimes", () => {
    const params = {
      timeRanges: [
        {
          start: "2020-07-01T14:00:00+09:00",
          end: "2020-07-01T15:00:00+09:00",
        },
      ],
      timeInterval: 30,
      attendees: [
        {
          type: "USER" as const,
          id: 6,
        },
      ],
      facilities: [
        {
          id: 1,
        },
      ],
      facilitySearchCondition: "OR" as const,
    };
    beforeEach(async () => {
      await scheduleClient.searchAvailableTimes(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe(
        "/api/v1/schedule/searchAvailableTimes"
      );
    });
    it("should send a post request", () => {
      expect(mockClient.getLogs()[0].method).toBe("post");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });

  describe("getFacilities", () => {
    const params = {
      limit: 100,
      offset: 0,
      name: "Facility",
    };
    beforeEach(async () => {
      await scheduleClient.getFacilities(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/schedule/facilities");
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });

  describe("getFacilityGroups", () => {
    const params = {
      limit: 100,
      offset: 0,
    };
    beforeEach(async () => {
      await scheduleClient.getFacilityGroups(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe(
        "/api/v1/schedule/facilityGroups"
      );
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });

  describe("getFacilitiesByFacilityGroupID", () => {
    const params = {
      id: 1,
      limit: 100,
      offset: 0,
    };
    beforeEach(async () => {
      await scheduleClient.getFacilitiesByFacilityGroupID(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe(
        "/api/v1/schedule/facilityGroups/1/facilities"
      );
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass limit and offset as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({
        limit: 100,
        offset: 0,
      });
    });
  });
});
